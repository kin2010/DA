import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getAllCourse } from "../../hook/LessionHook";
import { Link } from "react-router-dom";
const CoursePopulate = () => {
  const [queryparams, setQueryparams] = useState({
    limit: 9,
    skip: 0,
    // status: "published",
  });
  const { data } = useQuery(["courses", queryparams], getAllCourse);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {!!data?.courses?.length &&
          data?.courses?.map((course) => (
            <div className="item">
              <div className="cours-bx">
                <div className="action-box">
                  <img
                    src={
                      !!course?.thumbnail?.length
                        ? course?.thumbnail[0]
                        : "../images/course.jpg"
                    }
                    alt=""
                  />
                  <a href="#" className="btn">
                    Read More
                  </a>
                </div>
                <div className="info-bx text-center">
                  <h5>
                    <Link to={`/course/${course?._id}`}>{course?.name}</Link>
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
        {/* <div className="item">
          <div className="cours-bx">
            <div className="action-box">
              <img src="assets/images/courses/pic1.jpg" alt />
              <a href="#" className="btn">
                Read More
              </a>
            </div>
            <div className="info-bx text-center">
              <h5>
                <a href="#">Introduction EduChamp – LMS plugin</a>
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
                <h5>$120</h5>
              </div>
            </div>
          </div>
        </div> */}
      </Slider>
    </div>
  );
};

export default CoursePopulate;
