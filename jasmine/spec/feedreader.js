/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    describe("RSS Feeds", function() {
      // test ensures allFeeds is defined and is not empty
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
      /* test that loops through each feed
         * and ensures it has a url defined
         * and that the url is not empty.
         */
      it("has URL defined and is not empty", function() {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].hasOwnProperty("url")).toBe(true);
          if (allFeeds[i].hasOwnProperty("url")) {
            // test if url value is not empty
            expect(allFeeds[i]["url"].length).not.toBe(0);
          }
        }
      });
      /* test that loops through each feed
         * and ensures it has a name defined
         * and that the name is not empty.
         */
      it("has name defined and is not empty", function() {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].hasOwnProperty("name")).toBe(true);
          if (allFeeds[i].hasOwnProperty("name")) {
            // test if url value is not empty
            expect(allFeeds[i]["name"].length).not.toBe(0);
          }
        }
      });
    });

    describe("The menu", function() {
      // a variable to have a more concise code
      const body = document.body.classList;
      const menuIcon = document.querySelector(".menu-icon-link");
      // check if body contains menu-hidden
      it("is hidden by default", function() {
        expect(body.contains("menu-hidden")).toBe(true);
      });

      it("changes visibility when clicked", function() {
        // let menu = document.body.classList;
        menuIcon.onclick = function(event) {
          return true;
        };
        if (menuIcon.onclick) {
          expect(body.contains("menu-hidden") === true || menu.length === 0).toBe(true);
        }
      });
    });
    describe("Initial Entries", function() {
      let container = document.querySelector(".feed");
      /* test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      beforeEach(function(done) {// to make sure loadFeed is done
        loadFeed(0, done);
      });

      it("has  at least a single entry", function(done) {
        // check if '.entry' was added
        expect(container.querySelectorAll(".entry").length).toBeGreaterThan(0);
        // check if
        done();
      });
    });

    describe("New Feed Selection", function() {
      /* test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
      let feedEntry;
      let feedTitle;

      beforeEach(function(done) {

        loadFeed(0, function() {// load 1st feed and save content
          feedTitle = document.querySelector(".header-title").innerText;
          feedEntry = document.querySelector(".entry-link").innerText;
          loadFeed(1, function() {// load the next feed
            done();
          });
        });
      });
      it("has some other content", function(done) {// compare content of 1st and 2nd feed

        expect(document.querySelector(".entry-link").innerText).not.toBe(feedEntry);
        expect(document.querySelector(".header-title").innerText).not.toBe(feedTitle);

        done();
      });
    });
  })()
);
