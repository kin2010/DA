/* eslint-disable no-script-url */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCourse } from "../../hook/LessionHook";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const { data } = useQuery(["course_detail", id], getCourse);
  return (
    <>
      <header className="header rs-nav">
        <div className="sticky-header navbar-expand-lg">
          <div className="menu-bar clearfix">
            <div className="container clearfix">
              {/* Header Logo ==== */}
              <div className="menu-logo">
                <a href="index.html">
                  <img src="assets/images/logo.png" alt="" />
                </a>
              </div>
              {/* Mobile Nav Button ==== */}
              <button
                className="navbar-toggler collapsed menuicon justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#menuDropdown"
                aria-controls="menuDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span />
                <span />
                <span />
              </button>
              {/* Author Nav ==== */}
              <div className="secondary-menu">
                <div className="secondary-inner">
                  <ul>
                    <li>
                      <a href="javascript:;" className="btn-link">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" className="btn-link">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" className="btn-link">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                    {/* Search Button ==== */}
                    <li className="search-btn">
                      <button
                        id="quik-search-btn"
                        type="button"
                        className="btn-link"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Search Box ==== */}
              <div className="nav-search-bar">
                <form action="#">
                  <input
                    name="search"
                    defaultValue=""
                    type="text"
                    className="form-control"
                    placeholder="Type to search"
                  />
                  <span>
                    <i className="ti-search" />
                  </span>
                </form>
                <span id="search-remove">
                  <i className="ti-close" />
                </span>
              </div>
              {/* Navigation Menu ==== */}
              <div
                className="menu-links navbar-collapse collapse justify-content-start"
                id="menuDropdown"
              >
                <div className="menu-logo">
                  <a href="index.html">
                    <img src="assets/images/logo.png" alt="" />
                  </a>
                </div>
                <ul className="nav navbar-nav">
                  <li className="active">
                    <a href="javascript:;">
                      Home <i className="fa fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="index.html">Home 1</a>
                      </li>
                      <li>
                        <a href="index-2.html">Home 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;">
                      Pages <i className="fa fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="javascript:;">
                          About
                          <i className="fa fa-angle-right" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="about-1.html">About 1</a>
                          </li>
                          <li>
                            <a href="about-2.html">About 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:;">
                          Event
                          <i className="fa fa-angle-right" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="event.html">Event</a>
                          </li>
                          <li>
                            <a href="events-details.html">Events Details</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:;">
                          FAQ's
                          <i className="fa fa-angle-right" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="faq-1.html">FAQ's 1</a>
                          </li>
                          <li>
                            <a href="faq-2.html">FAQ's 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:;">
                          Contact Us
                          <i className="fa fa-angle-right" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="contact-1.html">Contact Us 1</a>
                          </li>
                          <li>
                            <a href="contact-2.html">Contact Us 2</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="portfolio.html">Portfolio</a>
                      </li>
                      <li>
                        <a href="profile.html">Profile</a>
                      </li>
                      <li>
                        <a href="membership.html">Membership</a>
                      </li>
                      <li>
                        <a href="error-404.html">404 Page</a>
                      </li>
                    </ul>
                  </li>
                  <li className="add-mega-menu">
                    <a href="javascript:;">
                      Our Courses <i className="fa fa-chevron-down" />
                    </a>
                    <ul className="sub-menu add-menu">
                      <li className="add-menu-left">
                        <h5 className="menu-adv-title">Our Courses</h5>
                        <ul>
                          <li>
                            <a href="courses.html">Courses </a>
                          </li>
                          <li>
                            <a href="courses-details.html">Courses Details</a>
                          </li>
                          <li>
                            <a href="profile.html">Instructor Profile</a>
                          </li>
                          <li>
                            <a href="event.html">Upcoming Event</a>
                          </li>
                          <li>
                            <a href="membership.html">Membership</a>
                          </li>
                        </ul>
                      </li>
                      <li className="add-menu-right">
                        <img src="assets/images/adv/adv.jpg" alt="" />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;">
                      Blog <i className="fa fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="blog-classic-grid.html">Blog Classic</a>
                      </li>
                      <li>
                        <a href="blog-classic-sidebar.html">
                          Blog Classic Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="blog-list-sidebar.html">Blog List Sidebar</a>
                      </li>
                      <li>
                        <a href="blog-standard-sidebar.html">
                          Blog Standard Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="blog-details.html">Blog Details</a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-dashboard">
                    <a href="javascript:;">
                      Dashboard <i className="fa fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="admin/index.html">Dashboard</a>
                      </li>
                      <li>
                        <a href="admin/add-listing.html">Add Listing</a>
                      </li>
                      <li>
                        <a href="admin/bookmark.html">Bookmark</a>
                      </li>
                      <li>
                        <a href="admin/courses.html">Courses</a>
                      </li>
                      <li>
                        <a href="admin/review.html">Review</a>
                      </li>
                      <li>
                        <a href="admin/teacher-profile.html">Teacher Profile</a>
                      </li>
                      <li>
                        <a href="admin/user-profile.html">User Profile</a>
                      </li>
                      <li>
                        <a href="javascript:;">
                          Calendar
                          <i className="fa fa-angle-right" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="admin/basic-calendar.html">
                              Basic Calendar
                            </a>
                          </li>
                          <li>
                            <a href="admin/list-view-calendar.html">
                              List View Calendar
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:;">
                          Mailbox
                          <i className="fa fa-angle-right" />
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <a href="admin/mailbox.html">Mailbox</a>
                          </li>
                          <li>
                            <a href="admin/mailbox-compose.html">Compose</a>
                          </li>
                          <li>
                            <a href="admin/mailbox-read.html">Mail Read</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="nav-social-link">
                  <a href="javascript:;">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="javascript:;">
                    <i className="fa fa-google-plus" />
                  </a>
                  <a href="javascript:;">
                    <i className="fa fa-linkedin" />
                  </a>
                </div>
              </div>
              {/* Navigation Menu END ==== */}
            </div>
          </div>
        </div>
      </header>
      {/* header END ==== */}
      {/* Content */}
      <div className="page-content bg-white">
        {/* inner page banner */}
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Courses Details</h1>
            </div>
          </div>
        </div>
        {/* Breadcrumb row */}
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="#">Home</a>
              </li>
              <li>Courses Details</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb row END */}
        {/* inner page banner END */}
        <div className="content-block">
          {/* About Us */}
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                  <div className="course-detail-bx">
                    <div className="course-price">
                      <del>$190</del>
                      <h4 className="price">$120</h4>
                    </div>
                    <div className="course-buy-now text-center">
                      <a href="#" className="btn radius-xl text-uppercase">
                        Buy Now This Courses
                      </a>
                    </div>
                    <div className="teacher-bx">
                      <div className="teacher-info">
                        <div className="teacher-thumb">
                          <img
                            src="assets/images/testimonials/pic1.jpg"
                            alt=""
                          />
                        </div>
                        <div className="teacher-name">
                          <h5>Hinata Hyuga</h5>
                          <span>Science Teacher</span>
                        </div>
                      </div>
                    </div>
                    <div className="cours-more-info">
                      <div className="review">
                        <span>3 Review</span>
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
                      </div>
                      <div className="price categories">
                        <span>Categories</span>
                        <h5 className="text-primary">Frontend</h5>
                      </div>
                    </div>
                    <div className="course-info-list scroll-page">
                      <ul className="navbar">
                        <li>
                          <a className="nav-link" href="#overview">
                            <i className="ti-zip" />
                            Overview
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="#curriculum">
                            <i className="ti-bookmark-alt" />
                            Curriculum
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="#instructor">
                            <i className="ti-user" />
                            Instructor
                          </a>
                        </li>
                        <li>
                          <a className="nav-link" href="#reviews">
                            <i className="ti-comments" />
                            Reviews
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="courses-post">
                    <div className="ttr-post-media media-effect">
                      <a href="#">
                        <img
                          src="assets/images/blog/default/thum1.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ttr-post-info">
                      <div className="ttr-post-title ">
                        <h2 className="post-title">{data?.course?.name}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="courese-overview" id="overview">
                    <h4>Overview</h4>
                    <div className="row">
                      <div className="col-md-12 col-lg-4">
                        <ul className="course-features">
                          <li>
                            <i className="ti-book" />{" "}
                            <span className="label">Lectures</span>{" "}
                            <span className="value">8</span>
                          </li>
                          <li>
                            <i className="ti-help-alt" />{" "}
                            <span className="label">Quizzes</span>{" "}
                            <span className="value">1</span>
                          </li>
                          <li>
                            <i className="ti-time" />{" "}
                            <span className="label">Duration</span>{" "}
                            <span className="value">60 hours</span>
                          </li>
                          <li>
                            <i className="ti-stats-up" />{" "}
                            <span className="label">Skill level</span>{" "}
                            <span className="value">Beginner</span>
                          </li>
                          <li>
                            <i className="ti-smallcap" />{" "}
                            <span className="label">Language</span>{" "}
                            <span className="value">English</span>
                          </li>
                          <li>
                            <i className="ti-user" />{" "}
                            <span className="label">Students</span>{" "}
                            <span className="value">32</span>
                          </li>
                          <li>
                            <i className="ti-check-box" />{" "}
                            <span className="label">Assessments</span>{" "}
                            <span className="value">Yes</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-12 col-lg-8">
                        <h5 className="m-b5">Course Description</h5>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry’s standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </p>
                        <h5 className="m-b5">Certification</h5>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry’s standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </p>
                        <h5 className="m-b5">Learning Outcomes</h5>
                        <ul className="list-checked primary">
                          <li>Over 37 lectures and 55.5 hours of content!</li>
                          <li>
                            LIVE PROJECT End to End Software Testing Training
                            Included.
                          </li>
                          <li>
                            Learn Software Testing and Automation basics from a
                            professional trainer from your own desk.
                          </li>
                          <li>
                            Information packed practical training starting from
                            basics to advanced testing techniques.
                          </li>
                          <li>
                            Best suitable for beginners to advanced level users
                            and who learn faster when demonstrated.
                          </li>
                          <li>
                            Course content designed by considering current
                            software testing technology and the job market.
                          </li>
                          <li>
                            Practical assignments at the end of every session.
                          </li>
                          <li>
                            Practical learning experience with live project work
                            and examples.cv
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="m-b30" id="curriculum">
                    <h4>Curriculum</h4>
                    <ul className="curriculum-list">
                      <li>
                        <h5>First Level</h5>
                        <ul>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 1.</span> Introduction to UI Design
                            </div>
                            <span>120 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 2.</span> User Research and Design
                            </div>
                            <span>60 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 3.</span> Evaluating User Interfaces
                              Part 1
                            </div>
                            <span>85 minutes</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h5>Second Level</h5>
                        <ul>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 1.</span> Prototyping and Design
                            </div>
                            <span>110 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 2.</span> UI Design Capstone
                            </div>
                            <span>120 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 3.</span> Evaluating User Interfaces
                              Part 2
                            </div>
                            <span>120 minutes</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h5>Final</h5>
                        <ul>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Part 1.</span> Final Test
                            </div>
                            <span>120 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Part 2.</span> Online Test
                            </div>
                            <span>120 minutes</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="" id="instructor">
                    <h4>Instructor</h4>
                    <div className="instructor-bx">
                      <div className="instructor-author">
                        <img src="assets/images/testimonials/pic1.jpg" alt="" />
                      </div>
                      <div className="instructor-info">
                        <h6>Keny White </h6>
                        <span>Professor</span>
                        <ul className="list-inline m-tb10">
                          <li>
                            <a href="#" className="btn sharp-sm facebook">
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm twitter">
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm linkedin">
                              <i className="fa fa-linkedin" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm google-plus">
                              <i className="fa fa-google-plus" />
                            </a>
                          </li>
                        </ul>
                        <p className="m-b0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries
                        </p>
                      </div>
                    </div>
                    <div className="instructor-bx">
                      <div className="instructor-author">
                        <img src="assets/images/testimonials/pic2.jpg" alt="" />
                      </div>
                      <div className="instructor-info">
                        <h6>Keny White </h6>
                        <span>Professor</span>
                        <ul className="list-inline m-tb10">
                          <li>
                            <a href="#" className="btn sharp-sm facebook">
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm twitter">
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm linkedin">
                              <i className="fa fa-linkedin" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm google-plus">
                              <i className="fa fa-google-plus" />
                            </a>
                          </li>
                        </ul>
                        <p className="m-b0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="" id="reviews">
                    <h4>Reviews</h4>
                    <div className="review-bx">
                      <div className="all-review">
                        <h2 className="rating-type">3</h2>
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
                        <span>3 Rating</span>
                      </div>
                      <div className="review-bar">
                        <div className="bar-bx">
                          <div className="side">
                            <div>5 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div className="bar-5" style={{ width: "90%" }} />
                            </div>
                          </div>
                          <div className="side right">
                            <div>150</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>4 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div className="bar-5" style={{ width: "70%" }} />
                            </div>
                          </div>
                          <div className="side right">
                            <div>140</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>3 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div className="bar-5" style={{ width: "50%" }} />
                            </div>
                          </div>
                          <div className="side right">
                            <div>120</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>2 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div className="bar-5" style={{ width: "40%" }} />
                            </div>
                          </div>
                          <div className="side right">
                            <div>110</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>1 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div className="bar-5" style={{ width: "20%" }} />
                            </div>
                          </div>
                          <div className="side right">
                            <div>80</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* contact area END */}
      </div>
      {/* Content END*/}
      {/* Footer ==== */}
      <footer>
        <div className="footer-top">
          <div className="pt-exebar">
            <div className="container">
              <div className="d-flex align-items-stretch">
                <div className="pt-logo mr-auto">
                  <a href="index.html">
                    <img src="assets/images/logo-white.png" alt="" />
                  </a>
                </div>
                <div className="pt-social-link">
                  <ul className="list-inline m-a0">
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pt-btn-join">
                  <a href="#" className="btn ">
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                <div className="widget">
                  <h5 className="footer-title">Sign Up For A Newsletter</h5>
                  <p className="text-capitalize m-b20">
                    Weekly Breaking news analysis and cutting edge advices on
                    job searching.
                  </p>
                  <div className="subscribe-form m-b20">
                    <form
                      className="subscription-form"
                      action="http://educhamp.themetrades.com/demo/assets/script/mailchamp.php"
                      method="post"
                    >
                      <div className="ajax-message" />
                      <div className="input-group">
                        <input
                          name="email"
                          required="required"
                          className="form-control"
                          placeholder="Your Email Address"
                          type="email"
                        />
                        <span className="input-group-btn">
                          <button
                            name="submit"
                            value="Submit"
                            type="submit"
                            className="btn"
                          >
                            <i className="fa fa-arrow-right" />
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 col-md-7 col-sm-12">
                <div className="row">
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h5 className="footer-title">Company</h5>
                      <ul>
                        <li>
                          <a href="index.html">Home</a>
                        </li>
                        <li>
                          <a href="about-1.html">About</a>
                        </li>
                        <li>
                          <a href="faq-1.html">FAQs</a>
                        </li>
                        <li>
                          <a href="contact-1.html">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h5 className="footer-title">Get In Touch</h5>
                      <ul>
                        <li>
                          <a href="http://educhamp.themetrades.com/admin/index.html">
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a href="blog-classic-grid.html">Blog</a>
                        </li>
                        <li>
                          <a href="portfolio.html">Portfolio</a>
                        </li>
                        <li>
                          <a href="event.html">Event</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h5 className="footer-title">Courses</h5>
                      <ul>
                        <li>
                          <a href="courses.html">Courses</a>
                        </li>
                        <li>
                          <a href="courses-details.html">Details</a>
                        </li>
                        <li>
                          <a href="membership.html">Membership</a>
                        </li>
                        <li>
                          <a href="profile.html">Profile</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
                <div className="widget widget_gallery gallery-grid-4">
                  <h5 className="footer-title">Our Gallery</h5>
                  <ul className="magnific-image">
                    <li>
                      <a
                        href="assets/images/gallery/pic1.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic1.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic2.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic2.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic3.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic3.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic4.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic4.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic5.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic5.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic6.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic6.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic7.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic7.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic8.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic8.jpg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <a target="_blank" href="https://www.templateshub.net">
                  Templates Hub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CourseDetail;
