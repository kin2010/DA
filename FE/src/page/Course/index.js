import React, { useState } from "react";
import Chapter from "../../component/Chapter";
import { useQuery } from "@tanstack/react-query";
import { getAllCourse } from "../../hook/LessionHook";
import { Pagination } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Course = () => {
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    limit: 9,
    skip: 9 * (page - 1),
  });
  const { data } = useQuery(["courses", queryparams], getAllCourse);

  const handlePaginationChange = (e, page) => {
    setPage(page);
    setQueryparams({
      limit: 9,
      skip: 9 * (page - 1),
    });
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-wraper">
      <Outlet></Outlet>
      <header className="header rs-nav">
        {/* <div className="top-bar">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="topbar-left">
                <ul>
                  <li>
                    <a href="faq-1.html">
                      <i className="fa fa-question-circle" />
                      Ask a Question
                    </a>
                  </li>
                  <li>
                    <a href="$">
                      <i className="fa fa-envelope-o" />
                      Support@website.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topbar-right">
                <ul>
                  <li>
                    <select className="header-lang-bx">
                      <option data-icon="flag flag-uk">English UK</option>
                      <option data-icon="flag flag-us">English US</option>
                    </select>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="register.html">Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
        <div
          // style={{ background: "#1976d2" }}
          className="sticky-header navbar-expand-lg"
        >
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
                      <a href="$" className="btn-link">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="$" className="btn-link">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="$" className="btn-link">
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
                    defaultValue
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
                    <a href="$">
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
                    <a href="$">
                      Pages <i className="fa fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="$">
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
                        <a href="$">
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
                        <a href="$">
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
                        <a href="$">
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
                    <a href="$">
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
                    <a href="$">
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
                    <a href="$">
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
                        <a href="$">
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
                        <a href="$">
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
                  <a href="$">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="$">
                    <i className="fa fa-google-plus" />
                  </a>
                  <a href="$">
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
          style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Our Courses</h1>
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
              <li>Our Courses</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb row END */}
        {/* inner page banner END */}
        <div className="content-block">
          {/* About Us */}
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                  <div className="widget courses-search-bx placeani">
                    <div className="form-group">
                      <div className="input-group">
                        <label>Search Courses</label>
                        <input
                          name="dzName"
                          type="text"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="widget widget_archive">
                    <h5 className="widget-title style-1">All Courses</h5>
                    <ul>
                      <li className="active">
                        <a href="#">General</a>
                      </li>
                      <li>
                        <a href="#">IT &amp; Software</a>
                      </li>
                      <li>
                        <a href="#">Photography</a>
                      </li>
                      <li>
                        <a href="#">Programming Language</a>
                      </li>
                      <li>
                        <a href="#">Technology</a>
                      </li>
                    </ul>
                  </div>
                  <div className="widget">
                    <a href="#">
                      <img src="assets/images/adv/adv.jpg" alt="" />
                    </a>
                  </div>
                  <div className="widget recent-posts-entry widget-courses">
                    <h5 className="widget-title style-1">Recent Courses</h5>
                    <div className="widget-post-bx">
                      <div className="widget-post clearfix">
                        <div className="ttr-post-media">
                          <img
                            src="assets/images/blog/recent-blog/pic1.jpg"
                            width={200}
                            height={143}
                            alt=""
                          />
                        </div>
                        <div className="ttr-post-info">
                          <div className="ttr-post-header">
                            <h6 className="post-title">
                              <a href="#">Introduction EduChamp</a>
                            </h6>
                          </div>
                          <div className="ttr-post-meta">
                            <ul>
                              <li className="price">
                                <del>$190</del>
                                <h5>$120</h5>
                              </li>
                              <li className="review">03 Review</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="widget-post clearfix">
                        <div className="ttr-post-media">
                          <img
                            src="assets/images/blog/recent-blog/pic3.jpg"
                            width={200}
                            height={160}
                            alt=""
                          />
                        </div>
                        <div className="ttr-post-info">
                          <div className="ttr-post-header">
                            <h6 className="post-title">
                              <a href="#">English For Tommorow</a>
                            </h6>
                          </div>
                          <div className="ttr-post-meta">
                            <ul>
                              <li className="price">
                                <h5 className="free">Free</h5>
                              </li>
                              <li className="review">07 Review</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    {!!data?.courses?.length &&
                      data?.courses?.map((course) => (
                        <div className="col-md-6 col-lg-4 col-sm-6 m-b30">
                          <div className="cours-bx">
                            <div className="action-box">
                              <img src="../images/pic6.jpg" alt="" />
                              <a href="#" className="btn">
                                Read More
                              </a>
                            </div>
                            <div className="info-bx text-center">
                              <h5>
                                <Link to={`/course/${course?._id}`}>
                                  {course?.name}
                                </Link>
                                {/* <a href={`course/${course?._id}`}>
                                  {course?.name}
                                </a> */}
                              </h5>
                              <span>Programming</span>
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
                              <div className="price">
                                <del>$190</del>
                                <h5>{course?.price}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        <Pagination
                          onChange={handlePaginationChange}
                          count={
                            !!data?.count ? Math.round(data?.count / 9) + 1 : 1
                          }
                          color="primary"
                        />
                        {/* <ul className="pagination">
                          <li className="previous">
                            <a href="#">
                              <i className="ti-arrow-left" /> Prev
                            </a>
                          </li>
                          <li className="active">
                            <a href="#">1</a>
                          </li>
                          <li>
                            <a href="#">2</a>
                          </li>
                          <li>
                            <a href="#">3</a>
                          </li>
                          <li className="next">
                            <a href="#">
                              Next <i className="ti-arrow-right" />
                            </a>
                          </li>
                        </ul> */}
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
                  <a href="#" className="btn">
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
      {/* Footer END ==== */}
      <button className="back-to-top fa fa-chevron-up" />
    </div>
  );
};

export default Course;
