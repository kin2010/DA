/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import { saveAs } from "file-saver";
import { format } from "date-fns";
export const ramdomRoom = (url = "", keyToReturn = "") => {
  const _url = new URLSearchParams(url);
  const result = _url.get("room");
  return !!result ? result : "";
};
export const randomString = () => {
  const crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);
  // console.log(222, crypto.getRandomValues(array));
  return crypto.getRandomValues(array);
};
export function userMediaAvailable() {
  // console.log(
  //   333,
  //   navigator.getUserMedia,
  //   navigator.webkitGetUserMedia,
  //   navigator.mozGetUserMedia,
  //   navigator.msGetUserMedia,
  //   navigator?.mediaDevices?.getUserMedia,
  //   navigator?.mediaDevices?.webkitGetUserMedia,
  //   navigator?.mediaDevices?.mozGetUserMedia,
  //   navigator?.mediaDevices?.msGetUserMedia
  // );
  return !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
}
export function pageHasFocus() {
  return !(
    document.hidden ||
    document.onfocusout ||
    window.onpagehide ||
    window.onblur
  );
}

export function getUserFullMedia() {
  if (userMediaAvailable()) {
    return (
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      }) ||
      navigator.webkitGetUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      }) ||
      navigator.mozGetUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      }) ||
      navigator.msGetUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
    );
  } else {
    console.log("11111111111111111111");
    throw new Error("User media not available");
  }
}

export function getUserAudio() {
  if (userMediaAvailable()) {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
  } else {
    throw new Error("User media not available");
  }
}
export function getIceServer() {
  return {
    iceServers: [
      {
        urls: ["stun:eu-turn4.xirsys.com"],
      },
      {
        username:
          "ml0jh0qMKZKd9P_9C0UIBY2G0nSQMCFBUXGlk6IXDJf8G2uiCymg9WwbEJTMwVeiAAAAAF2__hNSaW5vbGVl",
        credential: "4dd454a6-feee-11e9-b185-6adcafebbb45",
        urls: [
          "turn:eu-turn4.xirsys.com:80?transport=udp",
          "turn:eu-turn4.xirsys.com:3478?transport=tcp",
        ],
      },
    ],
  };
}
export const setLocalStream = (stream, mirrorMode = true, ref) => {
  // ref.current.srcObject = stream;
  const localVidElem = document.getElementById("local-video");

  localVidElem.srcObject = stream;
  mirrorMode
    ? localVidElem.classList.add("mirror-mode")
    : localVidElem.classList.remove("mirror-mode");
};

export function shareScreen() {
  if (userMediaAvailable()) {
    return navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "always",
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });
  } else {
    throw new Error("User media not available");
  }
}

export function replaceTrack(stream, recipientPeer) {
  let sender = recipientPeer.getSenders
    ? recipientPeer
        .getSenders()
        .find((s) => s.track && s.track.kind === stream.kind)
    : false;
  if (sender) {
    sender.replaceTrack(stream);
  }
  // sender ?  : "";
}

export function toggleShareIcons(share) {
  let shareIconElem = document.querySelector("#share-screen");

  if (share) {
    shareIconElem.setAttribute("title", "Stop sharing screen");
    shareIconElem.children[0].classList.add("text-primary");
    shareIconElem.children[0].classList.remove("text-white");
  } else {
    shareIconElem.setAttribute("title", "Share screen");
    shareIconElem.children[0].classList.add("text-white");
    shareIconElem.children[0].classList.remove("text-primary");
  }
}

export function toggleVideoBtnDisabled(disabled) {
  document.getElementById("toggle-video").disabled = disabled;
}

export function saveRecordedStream(stream, user) {
  let blob = new Blob(stream, { type: "video/webm" });

  let file = new File([blob], `${user}-${new Date().getUTCDay()}-record.webm`);

  saveAs(file);
}

export function toggleModal(id, show) {
  let el = document.getElementById(id);

  if (show) {
    el.style.display = "block";
    el.removeAttribute("aria-hidden");
  } else {
    el.style.display = "none";
    el.setAttribute("aria-hidden", true);
  }
}
export function closeVideo(elemId) {
  if (document.getElementById(elemId)) {
    document.getElementById(elemId).remove();
    adjustVideoElemSize();
  }
}
export function maximiseStream(e) {
  let elem = e.target.parentElement.previousElementSibling;
  try {
    elem.requestFullscreen() ||
      elem.mozRequestFullScreen() ||
      elem.webkitRequestFullscreen() ||
      elem.msRequestFullscreen();
  } catch (error) {}
}

export function singleStreamToggleMute(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("fa-microphone")) {
    e.target.parentElement.previousElementSibling.muted = true;
    e.target.classList.add("fa-microphone-slash");
    e.target.classList.remove("fa-microphone");
  } else {
    e.target.parentElement.previousElementSibling.muted = false;
    e.target.classList.add("fa-microphone");
    e.target.classList.remove("fa-microphone-slash");
  }
}

export function singleStreamToggleCamera(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("fa-video")) {
    e.target.parentElement.previousElementSibling.style.display =
      "inline-block";
    e.target.classList.add("fa-video-slash");
    e.target.classList.remove("fa-video");
  } else {
    e.target.parentElement.previousElementSibling.style.display = "none";
    e.target.classList.add("fa-video");
    e.target.classList.remove("fa-video-slash");
  }
}

export function focusVideo(e) {
  try {
    console.log("aaaa");
    const lists = document.getElementsByClassName("grid-item");
    let newHtml = "";
    for (let i = 0; i < lists.length; i++) {
      lists[i].classList.remove("item-focus");
      if (
        lists[i].outerHTML !== e.target.parentElement.parentElement.outerHTML
      ) {
        newHtml += lists[i].outerHTML;
      }
      console.log(e.target.parentElement.parentElement.outerHTML);
    }

    e.target.parentElement.parentElement.classList.add("item-focus");
    e.target.parentElement.parentElement.parentElement.classList.add(
      "container-flex"
    );
    if (lists?.length > 1) {
      e.target.parentElement.parentElement.parentElement.innerHTML =
        e.target.parentElement.parentElement.outerHTML +
        "<div class='other'>" +
        newHtml +
        "</div>";
    }
  } catch (error) {
    console.log(error);
  }
}

export function createDemoRemotes(str, total = 4) {
  let i = 0;

  // let testInterval = setInterval(() => {

  //   i++;
  //   console.log(i);
  //   if (i >= total) {
  //     clearInterval(testInterval);
  //   }
  // }, 2000);
  for (let j = 0; j <= total; j++) {
    let newVid = document.createElement("video");
    newVid.id = `demo-${i}-video`;
    newVid.srcObject = str;
    newVid.autoplay = true;
    newVid.className = "remote-video";

    //video controls elements
    let controlDiv = document.createElement("div");
    controlDiv.className = "remote-video-controls";
    controlDiv.innerHTML = `<i className="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
              <i className="fa fa-expand text-white expand-remote-video" title="Expand"></i>`;

    //create a new div for card
    let cardDiv = document.createElement("div");
    cardDiv.className = "card card-sm";
    cardDiv.id = `demo-${i}`;
    cardDiv.appendChild(newVid);
    cardDiv.appendChild(controlDiv);

    //put div in main-section elem
    document.getElementById("videos").appendChild(cardDiv);

    // adjustVideoElemSize();
  }
}
export function adjustVideoElemSize() {
  let elem = document.getElementsByClassName("grid-item");
  const total = elem.length;
  const deviceWidth = window.innerWidth;
  let e = 1;
  switch (true) {
    case total <= 1:
      e = 1;
      break;
    case 1 <= total <= 4:
      e = 2;
      break;
    case 5 <= total <= 9:
      e = 3;
      break;
    case 9 <= total:
      e = 4;
      break;
    default:
      e = 1;
      break;
  }
  if (deviceWidth <= 700) {
    switch (true) {
      case 1:
        e = 1;
        break;
      default:
        e = 1;
        break;
    }
  }
  console.log("adjut", e, total);
  const container = document.getElementById("videos");
  container.style.gridTemplateColumns = ` repeat(${e}, 1fr)`;
  //1
  //4 25
  // let newWidth =
  //   totalRemoteVideosDesktop <= 2
  //     ? "calc((50% - 5px)"
  //     : totalRemoteVideosDesktop === 3
  //     ? "calc(33.33% - 20/3px)"
  //     : totalRemoteVideosDesktop <= 8
  //     ? "calc(25% - 30/4px)"
  //     : totalRemoteVideosDesktop <= 15
  //     ? "calc(20% - 40/5px)"
  //     : totalRemoteVideosDesktop <= 18
  //     ? "calc(16% - 10px)"
  //     : totalRemoteVideosDesktop <= 23
  //     ? "15%"
  //     : totalRemoteVideosDesktop <= 32
  //     ? "12% - 70/8px"
  //     : "calc(10% - 9px)";

  // for (let i = 0; i < totalRemoteVideosDesktop; i++) {
  //   elem[i].style.width = newWidth;
  // }
}

export function changeSize(size = 2) {
  let elem = document.getElementsByClassName("card");
  for (let i = 0; i < totalRemoteVideosDesktop; i++) {
    if (
      elem[i].classList.contains("card_2") ||
      elem[i].classList.contains("card_3") ||
      elem[i].classList.contains("card_4") ||
      elem[i].classList.contains("card_5")
    ) {
      const name = elem[i].classList.forEach((c) => c.includes("card_"));
      elem[i].classList.remove(name);
    }
    elem[i].classList.add(`card_${size}`);
  }
}

export function addChat(data, senderType) {
  let chatMsgDiv = document.querySelector("#chat-messages");
  let contentAlign = "justify-content-end";
  let senderName = "You";
  let msgBg = "bg-white";
  if (senderType === "remote") {
    contentAlign = "justify-content-start";
    senderName = data.sender;
    msgBg = "";

    toggleChatNotificationBadge();
  }

  let infoDiv = document.createElement("div");
  infoDiv.className = "sender-info";
  infoDiv.innerText = `${senderName} - ${format(
    new Date(),
    "Do MMMM, yyyy h:mm a"
  )}`;

  let colDiv = document.createElement("div");
  colDiv.className = `col-10  chat-card msg ${msgBg}`;
  // colDiv.innerHTML = xssFilters
  //   .inHTMLData(data.msg)
  //   .autoLink({ target: "_blank", rel: "nofollow" });
  colDiv.innerHTML = data.msg;
  let rowDiv = document.createElement("div");
  rowDiv.className = `row ${contentAlign} mb-2`;

  colDiv.appendChild(infoDiv);
  rowDiv.appendChild(colDiv);

  chatMsgDiv.appendChild(rowDiv);

  /**
   * Move focus to the newly added message but only if:
   * 1. Page has focus
   * 2. User has not moved scrollbar upward. This is to prevent moving the scroll position if user is reading previous messages.
   */
  if (pageHasFocus) {
    rowDiv.scrollIntoView();
  }
}

export function toggleChatNotificationBadge() {
  if (document.querySelector("#chat-pane").classList.contains("chat-opened")) {
    document
      .querySelector("#new-chat-notification")
      .setAttribute("hidden", true);
  } else {
    document.querySelector("#new-chat-notification").removeAttribute("hidden");
  }
}
