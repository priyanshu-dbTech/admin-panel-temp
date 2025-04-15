import React, { useEffect } from "react";

const AboutUsPage = () => {
  useEffect(() => {
    // Initialize TinyMCE after component is mounted
    if (window.tinymce) {
      window.tinymce.init({
        selector: "textarea#about-pg",
      });
    }
  }, []);

  return (
    <div className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-regular fa-file-pen"></i>
            <span className="mr-4">&nbsp;About Us</span>
          </h1>
          <p></p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <form method="" action="">
                <div className="row">
                  <div className="col-lg-12 mt-2">
                    {/* TinyMCE Textarea */}
                    <textarea
                      id="about-pg"
                      name="content"
                      rows="20"
                      className="about-textarea"
                    ></textarea>
                    <div className="mt-3 pt-3">
                      <button
                        className="btn custom-btn text-white"
                        type="submit"
                      >
                        <i className="icon fa-light fa-paper-plane pr-2"></i>{" "}
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
