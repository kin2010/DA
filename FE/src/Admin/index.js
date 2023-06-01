/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import SideBar from "./component/SideBar";

const Admin = () => {
  return <SideBar></SideBar>;
  return (
    <>
      <div className="ttr-opened-sidebar ttr-pinned-sidebar">
        <header className="ttr-header">
          <div className="ttr-header-wrapper">
            {/*sidebar menu toggler start */}
            <div className="ttr-toggle-sidebar ttr-material-button">
              <i className="ti-close ttr-open-icon" />
              <i className="ti-menu ttr-close-icon" />
            </div>
            {/*sidebar menu toggler end */}
            {/*logo start */}
            <div className="ttr-logo-box">
              <div>
                <a href="index.html" className="ttr-logo">
                  <img
                    alt=""
                    className="ttr-logo-mobile"
                    src="assets/images/logo-mobile.png"
                    width={30}
                    height={30}
                  />
                  <img
                    alt=""
                    className="ttr-logo-desktop"
                    src="assets/images/logo-white.png"
                    width={160}
                    height={27}
                  />
                </a>
              </div>
            </div>
            {/*logo end */}
            <div className="ttr-header-menu">
              {/* header left menu start */}
              <ul className="ttr-header-navigation">
                <li>
                  <a
                    href="../index.html"
                    className="ttr-material-button ttr-submenu-toggle"
                  >
                    HOME
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="ttr-material-button ttr-submenu-toggle"
                  >
                    QUICK MENU <i className="fa fa-angle-down" />
                  </a>
                  <div className="ttr-header-submenu">
                    <ul>
                      <li>
                        <a href="../courses.html">Our Courses</a>
                      </li>
                      <li>
                        <a href="../event.html">New Event</a>
                      </li>
                      <li>
                        <a href="../membership.html">Membership</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              {/* header left menu end */}
            </div>
            <div className="ttr-header-right ttr-with-seperator">
              {/* header right menu start */}
              <ul className="ttr-header-navigation">
                <li>
                  <a href="#" className="ttr-material-button ttr-search-toggle">
                    <i className="fa fa-search" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="ttr-material-button ttr-submenu-toggle"
                  >
                    <i className="fa fa-bell" />
                  </a>
                  <div className="ttr-header-submenu noti-menu">
                    <div className="ttr-notify-header">
                      <span className="ttr-notify-text-top">9 New</span>
                      <span className="ttr-notify-text">
                        User Notifications
                      </span>
                    </div>
                    <div className="noti-box-list">
                      <ul>
                        <li>
                          <span className="notification-icon dashbg-gray">
                            <i className="fa fa-check" />
                          </span>
                          <span className="notification-text">
                            <span>Sneha Jogi</span> sent you a message.
                          </span>
                          <span className="notification-time">
                            <a href="#" className="fa fa-close" />
                            <span> 02:14</span>
                          </span>
                        </li>
                        <li>
                          <span className="notification-icon dashbg-yellow">
                            <i className="fa fa-shopping-cart" />
                          </span>
                          <span className="notification-text">
                            <a href="#">Your order is placed</a> sent you a
                            message.
                          </span>
                          <span className="notification-time">
                            <a href="#" className="fa fa-close" />
                            <span> 7 Min</span>
                          </span>
                        </li>
                        <li>
                          <span className="notification-icon dashbg-red">
                            <i className="fa fa-bullhorn" />
                          </span>
                          <span className="notification-text">
                            <span>Your item is shipped</span> sent you a
                            message.
                          </span>
                          <span className="notification-time">
                            <a href="#" className="fa fa-close" />
                            <span> 2 May</span>
                          </span>
                        </li>
                        <li>
                          <span className="notification-icon dashbg-green">
                            <i className="fa fa-comments-o" />
                          </span>
                          <span className="notification-text">
                            <a href="#">Sneha Jogi</a> sent you a message.
                          </span>
                          <span className="notification-time">
                            <a href="#" className="fa fa-close" />
                            <span> 14 July</span>
                          </span>
                        </li>
                        <li>
                          <span className="notification-icon dashbg-primary">
                            <i className="fa fa-file-word-o" />
                          </span>
                          <span className="notification-text">
                            <span>Sneha Jogi</span> sent you a message.
                          </span>
                          <span className="notification-time">
                            <a href="#" className="fa fa-close" />
                            <span> 15 Min</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    className="ttr-material-button ttr-submenu-toggle"
                  >
                    <span className="ttr-user-avatar">
                      <img
                        alt=""
                        src="assets/images/testimonials/pic3.jpg"
                        width={32}
                        height={32}
                      />
                    </span>
                  </a>
                  <div className="ttr-header-submenu">
                    <ul>
                      <li>
                        <a href="user-profile.html">My profile</a>
                      </li>
                      <li>
                        <a href="list-view-calendar.html">Activity</a>
                      </li>
                      <li>
                        <a href="mailbox.html">Messages</a>
                      </li>
                      <li>
                        <a href="../login.html">Logout</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="ttr-hide-on-mobile">
                  <a href="#" className="ttr-material-button">
                    <i className="ti-layout-grid3-alt" />
                  </a>
                  <div className="ttr-header-submenu ttr-extra-menu">
                    <a href="#">
                      <i className="fa fa-music" />
                      <span>Musics</span>
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play" />
                      <span>Videos</span>
                    </a>
                    <a href="#">
                      <i className="fa fa-envelope" />
                      <span>Emails</span>
                    </a>
                    <a href="#">
                      <i className="fa fa-book" />
                      <span>Reports</span>
                    </a>
                    <a href="#">
                      <i className="fa fa-smile-o" />
                      <span>Persons</span>
                    </a>
                    <a href="#">
                      <i className="fa fa-picture-o" />
                      <span>Pictures</span>
                    </a>
                  </div>
                </li>
              </ul>
              {/* header right menu end */}
            </div>
            {/*header search panel start */}
            <div className="ttr-search-bar">
              <form className="ttr-search-form">
                <div className="ttr-search-input-wrapper">
                  <input
                    type="text"
                    name="qq"
                    placeholder="search something..."
                    className="ttr-search-input"
                  />
                  <button
                    type="submit"
                    name="search"
                    className="ttr-search-submit"
                  >
                    <i className="ti-arrow-right" />
                  </button>
                </div>
                <span className="ttr-search-close ttr-search-toggle">
                  <i className="ti-close" />
                </span>
              </form>
            </div>
            {/*header search panel end */}
          </div>
        </header>
        {/* header end */}
        {/* Left sidebar menu start */}
        <div className="ttr-sidebar">
          <div className="ttr-sidebar-wrapper content-scroll">
            <div className="ttr-sidebar-logo">
              <a href="#">
                <img
                  alt=""
                  src="assets/images/logo.png"
                  width={122}
                  height={27}
                />
              </a>
              {/* <div class="ttr-sidebar-pin-button" title="Pin/Unpin Menu">
					<i class="material-icons ttr-fixed-icon">gps_fixed</i>
					<i class="material-icons ttr-not-fixed-icon">gps_not_fixed</i>
				</div> */}
              <div className="ttr-sidebar-toggle-button">
                <i className="ti-arrow-left" />
              </div>
            </div>
            {/* side menu logo end */}
            {/* sidebar menu start */}
            <nav className="ttr-sidebar-navi">
              <ul>
                <li>
                  <a href="index.html" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-home" />
                    </span>
                    <span className="ttr-label">Dashborad</span>
                  </a>
                </li>
                <li>
                  <a href="courses.html" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-book" />
                    </span>
                    <span className="ttr-label">Courses</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-email" />
                    </span>
                    <span className="ttr-label">Mailbox</span>
                    <span className="ttr-arrow-icon">
                      <i className="fa fa-angle-down" />
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a href="mailbox.html" className="ttr-material-button">
                        <span className="ttr-label">Mail Box</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailbox-compose.html"
                        className="ttr-material-button"
                      >
                        <span className="ttr-label">Compose</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailbox-read.html"
                        className="ttr-material-button"
                      >
                        <span className="ttr-label">Mail Read</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-calendar" />
                    </span>
                    <span className="ttr-label">Calendar</span>
                    <span className="ttr-arrow-icon">
                      <i className="fa fa-angle-down" />
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a
                        href="basic-calendar.html"
                        className="ttr-material-button"
                      >
                        <span className="ttr-label">Basic Calendar</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="list-view-calendar.html"
                        className="ttr-material-button"
                      >
                        <span className="ttr-label">List View</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="bookmark.html" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-bookmark-alt" />
                    </span>
                    <span className="ttr-label">Bookmarks</span>
                  </a>
                </li>
                <li>
                  <a href="review.html" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-comments" />
                    </span>
                    <span className="ttr-label">Review</span>
                  </a>
                </li>
                <li>
                  <a href="add-listing.html" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-layout-accordion-list" />
                    </span>
                    <span className="ttr-label">Add listing</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="ttr-material-button">
                    <span className="ttr-icon">
                      <i className="ti-user" />
                    </span>
                    <span className="ttr-label">My Profile</span>
                    <span className="ttr-arrow-icon">
                      <i className="fa fa-angle-down" />
                    </span>
                  </a>
                  <ul>
                    <li>
                      <a
                        href="user-profile.html"
                        className="ttr-material-button"
                      >
                        <span className="ttr-label">User Profile</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="teacher-profile.html"
                        className="ttr-material-button"
                      >
                        <span className="ttr-label">Teacher Profile</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="ttr-seperate" />
              </ul>
              {/* sidebar menu end */}
            </nav>
            {/* sidebar menu end */}
          </div>
        </div>
        {/* Left sidebar menu end */}
        {/*Main container start */}
        <main className="ttr-wrapper">
          <div className="container-fluid">
            <div className="db-breadcrumb">
              <h4 className="breadcrumb-title">Courses</h4>
              <ul className="db-breadcrumb-list">
                <li>
                  <a href="#">
                    <i className="fa fa-home" />
                    Home
                  </a>
                </li>
                <li>Courses</li>
              </ul>
            </div>
            <div className="row">
              {/* Your Profile Views Chart */}
              <div className="col-lg-12 m-b30">
                <div className="widget-box">
                  <div className="wc-title">
                    <h4>Your Courses</h4>
                  </div>
                  <div className="widget-inner">
                    <div className="card-courses-list admin-courses">
                      <div className="card-courses-media">
                        <img src="assets/images/courses/pic1.jpg" alt="" />
                      </div>
                      <div className="card-courses-full-dec">
                        <div className="card-courses-title">
                          <h4>Become a PHP Master and Make Money</h4>
                        </div>
                        <div className="card-courses-list-bx">
                          <ul className="card-courses-view">
                            <li className="card-courses-user">
                              <div className="card-courses-user-pic">
                                <img
                                  src="assets/images/testimonials/pic3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="card-courses-user-info">
                                <h5>Teacher</h5>
                                <h4>Keny White</h4>
                              </div>
                            </li>
                            <li className="card-courses-categories">
                              <h5>3 Categories</h5>
                              <h4>Backend</h4>
                            </li>
                            <li className="card-courses-review">
                              <h5>3 Review</h5>
                              <ul className="cours-star">
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                            </li>
                            <li className="card-courses-stats">
                              <a
                                href="#"
                                className="btn button-sm green radius-xl"
                              >
                                Pending
                              </a>
                            </li>
                            <li className="card-courses-price">
                              <del>$190</del>
                              <h5 className="text-primary">$120</h5>
                            </li>
                          </ul>
                        </div>
                        <div className="row card-courses-dec">
                          <div className="col-md-12">
                            <h6 className="m-b10">Course Description</h6>
                            <p>
                              Lorem ipsum dolor sit amet, est ei idque voluptua
                              copiosae, pro detracto disputando reformidans at,
                              ex vel suas eripuit. Vel alii zril maiorum ex, mea
                              id sale eirmod epicurei. Sit te possit senserit,
                              eam alia veritus maluisset ei, id cibo vocent
                              ocurreret per. Te qui doming doctus referrentur,
                              usu debet tamquam et. Sea ut nullam aperiam, mei
                              cu tollit salutatus delicatissimi.{" "}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <a href="#" className="btn green radius-xl outline">
                              Approve
                            </a>
                            <a href="#" className="btn red outline radius-xl ">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-courses-list admin-courses">
                      <div className="card-courses-media">
                        <img src="assets/images/courses/pic2.jpg" alt="" />
                      </div>
                      <div className="card-courses-full-dec">
                        <div className="card-courses-title">
                          <h4>Become a PHP Master and Make Money</h4>
                        </div>
                        <div className="card-courses-list-bx">
                          <ul className="card-courses-view">
                            <li className="card-courses-user">
                              <div className="card-courses-user-pic">
                                <img
                                  src="assets/images/testimonials/pic3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="card-courses-user-info">
                                <h5>Teacher</h5>
                                <h4>Keny White</h4>
                              </div>
                            </li>
                            <li className="card-courses-categories">
                              <h5>3 Categories</h5>
                              <h4>Backend</h4>
                            </li>
                            <li className="card-courses-review">
                              <h5>3 Review</h5>
                              <ul className="cours-star">
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                            </li>
                            <li className="card-courses-stats">
                              <a
                                href="#"
                                className="btn button-sm green radius-xl"
                              >
                                Pending
                              </a>
                            </li>
                            <li className="card-courses-price">
                              <del>$190</del>
                              <h5 className="text-primary">$120</h5>
                            </li>
                          </ul>
                        </div>
                        <div className="row card-courses-dec">
                          <div className="col-md-12">
                            <h6 className="m-b10">Course Description</h6>
                            <p>
                              Lorem ipsum dolor sit amet, est ei idque voluptua
                              copiosae, pro detracto disputando reformidans at,
                              ex vel suas eripuit. Vel alii zril maiorum ex, mea
                              id sale eirmod epicurei. Sit te possit senserit,
                              eam alia veritus maluisset ei, id cibo vocent
                              ocurreret per. Te qui doming doctus referrentur,
                              usu debet tamquam et. Sea ut nullam aperiam, mei
                              cu tollit salutatus delicatissimi.{" "}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <a href="#" className="btn green radius-xl outline">
                              Approve
                            </a>
                            <a href="#" className="btn red outline radius-xl ">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-courses-list admin-courses">
                      <div className="card-courses-media">
                        <img src="assets/images/courses/pic3.jpg" alt="" />
                      </div>
                      <div className="card-courses-full-dec">
                        <div className="card-courses-title">
                          <h4>Become a PHP Master and Make Money</h4>
                        </div>
                        <div className="card-courses-list-bx">
                          <ul className="card-courses-view">
                            <li className="card-courses-user">
                              <div className="card-courses-user-pic">
                                <img
                                  src="assets/images/testimonials/pic3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="card-courses-user-info">
                                <h5>Teacher</h5>
                                <h4>Keny White</h4>
                              </div>
                            </li>
                            <li className="card-courses-categories">
                              <h5>3 Categories</h5>
                              <h4>Backend</h4>
                            </li>
                            <li className="card-courses-review">
                              <h5>3 Review</h5>
                              <ul className="cours-star">
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                            </li>
                            <li className="card-courses-stats">
                              <a
                                href="#"
                                className="btn button-sm green radius-xl"
                              >
                                Pending
                              </a>
                            </li>
                            <li className="card-courses-price">
                              <del>$190</del>
                              <h5 className="text-primary">$120</h5>
                            </li>
                          </ul>
                        </div>
                        <div className="row card-courses-dec">
                          <div className="col-md-12">
                            <h6 className="m-b10">Course Description</h6>
                            <p>
                              Lorem ipsum dolor sit amet, est ei idque voluptua
                              copiosae, pro detracto disputando reformidans at,
                              ex vel suas eripuit. Vel alii zril maiorum ex, mea
                              id sale eirmod epicurei. Sit te possit senserit,
                              eam alia veritus maluisset ei, id cibo vocent
                              ocurreret per. Te qui doming doctus referrentur,
                              usu debet tamquam et. Sea ut nullam aperiam, mei
                              cu tollit salutatus delicatissimi.{" "}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <a href="#" className="btn green radius-xl outline">
                              Approve
                            </a>
                            <a href="#" className="btn red outline radius-xl ">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-courses-list admin-courses">
                      <div className="card-courses-media">
                        <img src="assets/images/courses/pic4.jpg" alt="" />
                      </div>
                      <div className="card-courses-full-dec">
                        <div className="card-courses-title">
                          <h4>Become a PHP Master and Make Money</h4>
                        </div>
                        <div className="card-courses-list-bx">
                          <ul className="card-courses-view">
                            <li className="card-courses-user">
                              <div className="card-courses-user-pic">
                                <img
                                  src="assets/images/testimonials/pic3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="card-courses-user-info">
                                <h5>Teacher</h5>
                                <h4>Keny White</h4>
                              </div>
                            </li>
                            <li className="card-courses-categories">
                              <h5>3 Categories</h5>
                              <h4>Backend</h4>
                            </li>
                            <li className="card-courses-review">
                              <h5>3 Review</h5>
                              <ul className="cours-star">
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li className="active">
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                                <li>
                                  <i className="fa fa-star" />
                                </li>
                              </ul>
                            </li>
                            <li className="card-courses-stats">
                              <a
                                href="#"
                                className="btn button-sm green radius-xl"
                              >
                                Pending
                              </a>
                            </li>
                            <li className="card-courses-price">
                              <del>$190</del>
                              <h5 className="text-primary">$120</h5>
                            </li>
                          </ul>
                        </div>
                        <div className="row card-courses-dec">
                          <div className="col-md-12">
                            <h6 className="m-b10">Course Description</h6>
                            <p>
                              Lorem ipsum dolor sit amet, est ei idque voluptua
                              copiosae, pro detracto disputando reformidans at,
                              ex vel suas eripuit. Vel alii zril maiorum ex, mea
                              id sale eirmod epicurei. Sit te possit senserit,
                              eam alia veritus maluisset ei, id cibo vocent
                              ocurreret per. Te qui doming doctus referrentur,
                              usu debet tamquam et. Sea ut nullam aperiam, mei
                              cu tollit salutatus delicatissimi.{" "}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <a href="#" className="btn green radius-xl outline">
                              Approve
                            </a>
                            <a href="#" className="btn red outline radius-xl ">
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Your Profile Views Chart END*/}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
