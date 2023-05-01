import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import {
  addChat,
  closeVideo,
  createDemoRemotes,
  getIceServer,
  getUserFullMedia,
  maximiseStream,
  ramdomRoom,
  replaceTrack,
  saveRecordedStream,
  setLocalStream,
  shareScreen,
  singleStreamToggleMute,
  toggleChatNotificationBadge,
  toggleModal,
  toggleShareIcons,
  toggleVideoBtnDisabled,
} from "../../../ultis/helper";
import "../../Call/index.css";
import axios from "axios";

const host = "http://đ192.168.1.15:3333";
// const host = process.env.API || "http://localhost:3333";

const Streamsssss = () => {
  const [video, setVideo] = useState();

  const [available, setAvailable] = useState({
    audio: false,
    video: false,
  });
  const [newz, setNew] = useState(false);

  const socketRef = useRef();

  const localVideoref1 = useRef();
  const [socId, setSocId] = useState();
  useEffect(() => {
    // getPermissions();
    const socket = socketIOClient(host);
    const arr = [];
    const socketId = socket.id;
    console.log(socket, socketId, 444, socket.id);
    let myStream = "";
    let screen = "";
    let username = "admin";
    var recordedStream = [];
    var mediaRecorder = "";
    const room = ramdomRoom("?room=123456", "room");
    // console.log("connecting", socket, id, room, socketId, socketRef.current.id);
    function init(createOffer, partnerName, member = []) {
      arr[partnerName] = new RTCPeerConnection(getIceServer());
      console.log("set", arr);
      // setPc(copy);
      // pc[partnerName] = new RTCPeerConnection(getIceServer());
      if (screen && screen?.getTracks()?.length) {
        // if (screen && screen?.getTracks()?.length) {
        screen?.getTracks()?.forEach((track) => {
          arr[partnerName]?.addTrack(track, screen); //should trigger negotiationneeded event
        });
      } else if (myStream) {
        myStream.getTracks().forEach((track) => {
          arr[partnerName].addTrack(track, myStream); //should trigger negotiationneeded event
        });
      } else {
        getUserFullMedia()
          .then((stream) => {
            //save my stream
            // myStream = stream;
            // setMySteam(stream);
            myStream = stream;
            stream.getTracks().forEach((track) => {
              // pc[partnerName].addTrack(track, stream); //should trigger negotiationneeded event
              arr[partnerName].addTrack(track, stream); //should trigger negotiationneeded event
            });

            // h.setLocalStream(stream);
            setLocalStream(stream, true, localVideoref1);
          })
          .catch((e) => {
            console.error(`stream error: ${e}`);
          });
      }
      const socketId = socket.id;

      //create offer => usser khac
      if (createOffer) {
        arr[partnerName].onnegotiationneeded = async () => {
          let offer = await arr[partnerName].createOffer();

          await arr[partnerName].setLocalDescription(offer);
          // console.log(88, socketRef, socketRef.current.id);
          console.log("______", socket.id);
          socket.emit("sdp", {
            description: arr[partnerName].localDescription,
            to: partnerName,
            sender: socket.id,
          });
        };
      }

      //send ice candidate to partnerNames
      arr[partnerName].onicecandidate = ({ candidate }) => {
        if (!!candidate) {
          socket.emit("ice candidates", {
            candidate: candidate,
            to: partnerName,
            sender: socketId,
          });
        }
      };

      //add
      arr[partnerName].ontrack = (e) => {
        let str = e.streams[0];
        // console.log(222, str);
        if (document.getElementById(`${partnerName}-video`)) {
          document.getElementById(`${partnerName}-video`).srcObject = str;
        } else {
          //video elem
          let newVid = document.createElement("video");
          newVid.id = `${partnerName}-video`;
          newVid.srcObject = str;
          newVid.autoplay = true;
          newVid.className = "remote-video";

          //video controls elements
          let controlDiv = document.createElement("div");
          controlDiv.className = "remote-video-controls";
          controlDiv.innerHTML = `<i className="fa-solid fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
                        <i className="fa fa-solid  fa-expand text-white expand-remote-video" title="Expand"></i>`;

          //create a new div for card
          let cardDiv = document.createElement("div");
          cardDiv.className = "card card-sm";
          cardDiv.id = partnerName;
          cardDiv.appendChild(newVid);
          cardDiv.appendChild(controlDiv);

          //put div in main-section elem
          document.getElementById("videos").appendChild(cardDiv);

          // h.adjustVideoElemSize();
        }
      };

      arr[partnerName].onconnectionstatechange = (d) => {
        switch (arr[partnerName].iceConnectionState) {
          case "disconnected":
          case "failed":
            closeVideo(partnerName);
            break;

          case "closed":
            closeVideo(partnerName);
            break;
        }
      };

      arr[partnerName].onsignalingstatechange = (d) => {
        switch (arr[partnerName].signalingState) {
          case "closed":
            console.log("Signalling state is 'closed'");
            // h.closeVideo(partnerName);
            break;
        }
      };
      // console.log(999, copy);
    }
    const newUser = (data) => {
      setSocId(socket?.id);
      setNew(true);
      socket.emit("newUserStart", {
        to: data.socketId,
        sender: socket?.id,
      });
      // // pc.push(data.socketId);
      // const copy = [...pc];
      // copy.push(data.socketId);
      arr.push(data.socketId);
      // setPc(copy);
      // const MB = data.member?.filter((m) => m !== socketRef.current?.id);
      // setMb(MB);
      init(true, data.socketId);
      // init(true, data.socketId);
      // console.log("user co san", data, socketRef.current?.id);
    };
    const newUserStart = (data) => {
      // pc.push(data.sender);
      // arr.push(2);
      // const copy = [...pc];
      // copy.push(data.sender);
      // setPc(copy);
      // const MB = data.member?.filter((m) => m !== socketRef.current?.id);
      // setMb(MB);
      arr.push(data.sender);
      init(false, data.sender);

      // console.log("nhung ussr khát", data);
    };
    const ICE = async (data) => {
      if (data?.candidate && !!data?.sender) {
        await arr[data.sender].addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    };
    function getAndSetUserStream() {
      getUserFullMedia()
        .then((stream) => {
          //save my stream
          myStream = stream;

          setLocalStream(stream);
          // createDemoRemotes(stream);
        })
        .catch((e) => {
          console.error(1111, `stream error: ${e}`);
        });
    }
    const SDP = async (data) => {
      console.log(6, data, 4, arr, data.sender);
      if (data.description.type === "offer") {
        if (!!data.description) {
          await arr[data.sender].setRemoteDescription(
            new RTCSessionDescription(data.description)
          );
        }

        getUserFullMedia()
          .then(async (stream) => {
            if (!document.getElementById("local")?.srcObject) {
              setLocalStream(stream);
            }

            //save my stream
            myStream = stream;

            stream.getTracks().forEach((track) => {
              arr[data.sender].addTrack(track, stream);
            });

            let answer = await arr[data.sender].createAnswer();

            await arr[data.sender].setLocalDescription(answer);

            socket.emit("sdp", {
              description: arr[data.sender].localDescription,
              to: data.sender,
              sender: socket.id,
            });
          })
          .catch((e) => {
            console.error(e);
          });
      } else if (data.description.type === "answer") {
        await arr[data.sender].setRemoteDescription(
          new RTCSessionDescription(data.description)
        );
      }
    };
    function handleShareScreen() {
      shareScreen()
        .then((stream) => {
          toggleShareIcons(true);

          //disable the video toggle btns while sharing screen. This is to ensure clicking on the btn does not interfere with the screen sharing
          //It will be enabled was user stopped sharing screen
          toggleVideoBtnDisabled(true);

          //save my screen stream
          screen = stream;

          //share the new stream with all partners
          broadcastNewTracks(stream, "video", false);

          //When the stop sharing button shown by the browser is clicked
          screen.getVideoTracks()[0].addEventListener("ended", () => {
            stopSharingScreen();
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }

    function stopSharingScreen() {
      //enable video toggle btn
      toggleVideoBtnDisabled(false);

      return new Promise((res, rej) => {
        if (!!screen.getTracks().length) {
          screen.getTracks().forEach((track) => track.stop());
        }

        res();
      })
        .then(() => {
          toggleShareIcons(false);
          broadcastNewTracks(myStream, "video");
        })
        .catch((e) => {
          console.error(e);
        });
    }

    function broadcastNewTracks(stream, type, mirrorMode = true) {
      setLocalStream(stream, mirrorMode);

      let track =
        type === "audio"
          ? stream.getAudioTracks()[0]
          : stream.getVideoTracks()[0];

      for (let p in arr) {
        let pName = arr[p];

        if (typeof arr[pName] == "object") {
          replaceTrack(track, arr[pName]);
        }
      }
    }

    function toggleRecordingIcons(isRecording) {
      let e = document.getElementById("record");

      if (isRecording) {
        e.setAttribute("title", "Stop recording");
        e.children[0].classList.add("text-danger");
        e.children[0].classList.remove("text-white");
      } else {
        e.setAttribute("title", "Record");
        e.children[0].classList.add("text-white");
        e.children[0].classList.remove("text-danger");
      }
    }

    function startRecording(stream) {
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });

      mediaRecorder.start(1000);
      toggleRecordingIcons(true);

      mediaRecorder.ondataavailable = function (e) {
        recordedStream.push(e.data);
      };

      mediaRecorder.onstop = function () {
        toggleRecordingIcons(false);

        saveRecordedStream(recordedStream, username);

        setTimeout(() => {
          recordedStream = [];
        }, 3000);
      };

      mediaRecorder.onerror = function (e) {
        console.error(e);
      };
    }
    function sendMsg(msg) {
      let data = {
        room: room,
        msg: msg,
        sender: `${username}`,
      };

      //emit chat message
      socket.emit("chat", data);

      //add localchat
      addChat(data, "local");
    }
    const chatBtn = (e) => {
      console.log("here: ", document.getElementById("chat-input").value);
      if (document.getElementById("chat-input").value.trim()) {
        sendMsg(document.getElementById("chat-input").value);

        setTimeout(() => {
          document.getElementById("chat-input").value = "";
        }, 50);
      }
    };
    document
      .getElementById("chat-input-btn")
      .addEventListener("click", chatBtn);
    const toogleChat = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let chatElem = document.querySelector("#chat-pane");
      let mainSecElem = document.querySelector("#main-section");
      console.log(22222222222222, chatElem, chatElem.classList);
      if (chatElem.classList.contains("chat-opened")) {
        chatElem.setAttribute("hidden", true);
        mainSecElem.classList.remove("col-md-9");
        mainSecElem.classList.add("col-md-12");
        chatElem.classList.remove("chat-opened");
      } else {
        console.log(33);
        // chatElem.attributes.removeNamedItem("hidden");
        chatElem.removeAttribute("hidden");
        mainSecElem.classList.remove("col-md-12");
        mainSecElem.classList.add("col-md-9");
        chatElem.classList.add("chat-opened");
      }

      //remove the 'New' badge on chat icon (if any) once chat is opened.
      setTimeout(() => {
        if (
          document.querySelector("#chat-pane").classList.contains("chat-opened")
        ) {
          toggleChatNotificationBadge();
        }
      }, 300);
    };
    document
      .querySelector("#toggle-chat-pane")
      .addEventListener("click", toogleChat);
    //Chat textarea
    const keypress = (e) => {
      console.log(8, e.code);
      if (e.which === 13 && e.target.value.trim()) {
        e.preventDefault();

        sendMsg(e.target.value);

        setTimeout(() => {
          e.target.value = "";
        }, 50);
      }
    };
    document
      .getElementById("chat-input")
      .addEventListener("keypress", keypress);

    // document.getElementById("chat-input-btn").addEventListener("click", (e) => {
    //   console.log("here: ", document.getElementById("chat-input").value);
    //   if (document.getElementById("chat-input").value.trim()) {
    //     sendMsg(document.getElementById("chat-input").value);

    //     setTimeout(() => {
    //       document.getElementById("chat-input").value = "";
    //     }, 50);
    //   }
    // });

    // //Chat textarea
    // document.getElementById("chat-input").addEventListener("keypress", (e) => {
    //   if (e.which === 13 && e.target.value.trim()) {
    //     e.preventDefault();

    //     sendMsg(e.target.value);

    //     setTimeout(() => {
    //       e.target.value = "";
    //     }, 50);
    //   }
    // });

    //When the video icon is clicked
    document.getElementById("toggle-video").addEventListener("click", (e) => {
      e.preventDefault();

      let elem = document.getElementById("toggle-video");

      if (myStream.getVideoTracks()[0].enabled) {
        e.target.classList.remove("fa-video");
        e.target.classList.add("fa-video-slash");
        elem.setAttribute("title", "Show Video");

        myStream.getVideoTracks()[0].enabled = false;
      } else {
        e.target.classList.remove("fa-video-slash");
        e.target.classList.add("fa-video");
        elem.setAttribute("title", "Hide Video");

        myStream.getVideoTracks()[0].enabled = true;
      }

      broadcastNewTracks(myStream, "video");
    });

    //When the mute icon is clicked
    document.getElementById("toggle-mute").addEventListener("click", (e) => {
      e.preventDefault();

      let elem = document.getElementById("toggle-mute");

      if (myStream.getAudioTracks()[0].enabled) {
        e.target.classList.remove("fa-microphone-alt");
        e.target.classList.add("fa-microphone-alt-slash");
        elem.setAttribute("title", "Unmute");

        myStream.getAudioTracks()[0].enabled = false;
      } else {
        e.target.classList.remove("fa-microphone-alt-slash");
        e.target.classList.add("fa-microphone-alt");
        elem.setAttribute("title", "Mute");

        myStream.getAudioTracks()[0].enabled = true;
      }

      broadcastNewTracks(myStream, "audio");
    });

    //When user clicks the 'Share screen' button
    document.getElementById("share-screen").addEventListener("click", (e) => {
      e.preventDefault();
      if (
        screen &&
        screen.getVideoTracks().length &&
        screen.getVideoTracks()[0].readyState !== "ended"
      ) {
        stopSharingScreen();
      } else {
        handleShareScreen();
      }
    });

    //When record button is clicked
    document.getElementById("record").addEventListener("click", (e) => {
      /**
       * Ask user what they want to record.
       * Get the stream based on selection and start recording
       */
      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        toggleModal("recording-options-modal", true);
      } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
      } else if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    });

    document.getElementById("closeModal").addEventListener("click", () => {
      toggleModal("recording-options-modal", false);
    });

    //When user choose to record screen
    document.getElementById("record-screen").addEventListener("click", () => {
      toggleModal("recording-options-modal", false);

      if (screen && screen.getVideoTracks().length) {
        startRecording(screen);
      } else {
        shareScreen()
          .then((screenStream) => {
            startRecording(screenStream);
          })
          .catch(() => {});
      }
    });

    //When user choose to record own video
    document.getElementById("record-video").addEventListener("click", () => {
      toggleModal("recording-options-modal", false);

      if (myStream && myStream.getTracks().length) {
        startRecording(myStream);
      } else {
        getUserFullMedia()
          .then((videoStream) => {
            startRecording(videoStream);
          })
          .catch(() => {});
      }
    });

    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById("local").addEventListener("click", () => {
      if (!document.pictureInPictureElement) {
        document
          .getElementById("local")
          .requestPictureInPicture()
          .catch((error) => {
            // Video failed to enter Picture-in-Picture mode.
            console.error(error);
          });
      } else {
        document.exitPictureInPicture().catch((error) => {
          // Video failed to leave Picture-in-Picture mode.
          console.error(error);
        });
      }
    });
    document.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("expand-remote-video")) {
        maximiseStream(e);
      } else if (e.target && e.target.classList.contains("mute-remote-mic")) {
        singleStreamToggleMute(e);
      }
    });
    const handleChat = (data) => {
      addChat(data, "remote");
    };
    getAndSetUserStream();
    socket.on("connect", () => {
      socket.emit("subscribe", {
        room: room,
        socketId: socket.id,
      });

      //những user có sẵn trong phòng
      socket.on("new user", newUser);
      //then moi vao: new user
      socket.on("newUserStart", newUserStart);
      socket.on("ice candidates", ICE);
      socket.on("sdp", SDP);
      socket.on("chat", handleChat);
    });
    console.log(1234, document.getElementById("toggle-video"));

    return () => {
      socket.off("subscribe");
      socket.off("new user", newUser);
      socket.off("newUserStart", newUserStart);
      socket.off("ice candidates", ICE);
      socket.off("sdp", SDP);
      socket.off("chat", handleChat);
      socket.disconnect();
      document
        .getElementById("chat-input-btn")
        .removeEventListener("click", chatBtn);
      document
        .querySelector("#toggle-chat-pane")
        .removeEventListener("click", toogleChat);
      document
        .getElementById("chat-input")
        .removeEventListener("keypress", keypress);
    };
  }, []);
  const [showchat, setshowchat] = useState(true);
  const handleChat = () => {
    console.log(1);
    setshowchat(!showchat);
  };
  return (
    <div>
      <div className="custom-modal" id="recording-options-modal">
        <div className="custom-modal-content">
          <div className="row text-center">
            <div className="col-md-6 mb-2">
              <span className="record-option" id="record-video">
                Record video
              </span>
            </div>
            <div className="col-md-6 mb-2">
              <span className="record-option" id="record-screen">
                Record screen
              </span>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <button className="btn btn-outline-danger" id="closeModal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="px-3 py-3 navbar fixed-top bg-black rounded-0 d-print-none navv">
        <div className="text-white">Video Call</div>
        <div className="pull-right room-comm">
          <span className="text-white mr-5">
            socket {socId}: <span id="randomNumber"></span>
          </span>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="toggle-video"
            title="Hide Video"
          >
            <i className="text-white fa-solid fa-users"></i>
          </button>
          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="toggle-video"
            title="Hide Video"
          >
            <i className="fa-solid fa-video text-white"></i>
          </button>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="toggle-mute"
            title="Mute"
          >
            <i className="fa fa-microphone-alt text-white"></i>
          </button>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="share-screen"
            title="Share screen"
          >
            <i className="fa-solid fa-desktop text-white"></i>
          </button>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="record"
            title="Record"
          >
            <i className="fa fa-dot-circle text-white"></i>
          </button>

          <button
            onClick={() => handleChat()}
            className="btn btn-sm text-white pull-right btn-no-effect"
            id="toggle-chat-pane"
          >
            <i className="fa fa-comment"></i>{" "}
            <span
              className="badge badge-danger very-small font-weight-lighter"
              id="new-chat-notification"
            >
              New
            </span>
          </button>
        </div>
        <button className="btn btn-sm rounded-0 btn-no-effect text-white">
          <a href="/" className="text-white text-decoration-none">
            <i className="fa fa-sign-out-alt text-white" title="Leave"></i>
          </a>
        </button>
      </nav>
      <div>
        <div className="vd">
          <video
            className="local-video mirror-mode present "
            id="local"
            volume="0"
            autoPlay
            muted
          ></video>
          {/* <div className="ui">
            <span>
              <i className="fa-solid fa-microphone"></i>
            </span>
            <span>
              <i className="fa-solid fa-microphone-slash"></i>
            </span>
            <span>
              <i className="fa-solid fa-video"></i>
            </span>
            <span>
              <i className="fa-solid fa-video-slash"></i>
            </span>
          </div> */}
        </div>
        <div className="row">
          <div id="sort"></div>
        </div>
        <i
          className="fa-solid fa-microphone-slash
        "
        ></i>
        <i className="fa-regular fa-grid-2"></i>
        <i className="fa-light fa-shuffle"></i>
        <i className="fa-thin fa-grid-5"></i>
      </div>
      <div className="row mt-2 mb-2" id="videos"></div>
      <div className="row">
        <div className="col-md-12 main" id="main-section">
          <div className="row mt-2 mb-2" id="videos"></div>
        </div>

        <div
          className={`col-md-3 chat-col d-print-none mb-2  ${
            showchat ? "chat-opened" : ""
          }`}
          style={{ backgroundColor: "#f5f5f5", border: " 1px solid gray" }}
          id="chat-pane"
          hidden
          //  hidden={showchat}
        >
          <div className="row">
            <div className="px-5 pt-2 col-12 text-black h2 mb-3">
              Trò chuyện :
            </div>
          </div>

          <div id="chat-messages"></div>

          <form>
            <div className="input-group mb-3">
              <textarea
                id="chat-input"
                className="form-control rounded-0 chat-box border-info"
                rows="3"
                placeholder="Type here..."
              ></textarea>
              <div className="input-group-append" id="chat-input-btn">
                <button
                  type="button"
                  className="btn btn-dark rounded-0 border-info btn-no-effect"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Streamsssss;
