window.onload = function () {
  
  if (typeof self === 'undefined' || !self.Prism || !self.document || !document.createElement) {
  		return;
  }
  
  Prism.plugins.walkthrough = {
    
    showComment: function(pre, direction = 0) {
      
      // Check for comments
      try {
          var comments = JSON.parse(decodeURIComponent(pre.getAttribute('data-comments')));
          if (comments.length == 0) { return }
        } catch(e) {
          console.log("ignored comment with error");
          return;
      }

      // Get next/prev comment, or initial comment
      var commentNumber = pre.getAttribute('data-current-comment');
      commentNumber = commentNumber ? parseInt(commentNumber) + direction : 0;

      // Make sure comment exists, or bail
      var comment = comments[commentNumber];
      if (!comment) { return }

      // Store which comment is now visible
      pre.setAttribute('data-current-comment', commentNumber);
      
      // Get comment data
      var line = Object.keys(comment, 0)[0];
      var text = comment[line];

      // Setup lines to be highlighted
      pre.setAttribute('data-line', line || " ");
      
      // Append comment text
      var commentDiv = pre.querySelectorAll('.wt-text');
      commentDiv[0].innerHTML = text;
      
      // Update buttons
      var prev = pre.querySelector('.wt-prev');
      var next = pre.querySelector('.wt-next');
      if (prev) {
        commentNumber == 0 ? prev.setAttribute('disabled', true) : prev.removeAttribute('disabled');
        commentNumber == comments.length - 1 ? next.setAttribute('disabled', true) : next.removeAttribute('disabled');
      }


      // Rerun Prism so lines are highlighted
      Prism.highlightAll();
    },
    
    init: function() {
      
      var elements = document.querySelectorAll('pre');
      
      Array.prototype.forEach.call(elements, function(pre, i) {
        try {
          var comments = JSON.parse(decodeURIComponent(pre.getAttribute('data-comments')));
          if (comments.length == 0) { return }
        } catch(e) {
          console.log("ignored comment with error");
          return;
        }

        var walkthrough = pre.querySelectorAll('.walkthrough');
        if (walkthrough.length == 0) { 

          // Build comment div
          walkthrough = document.createElement("div");
          walkthrough.setAttribute('class', 'walkthrough');        

          // Build comment text div
          var text = "<div class='wt-text'></div>";      
          var buttons = "";

          // Build comment buttons
          if (comments.length > 1) {
            buttons = 
             "<div class='wt-buttons'>\
                <button class='wt-btn wt-prev'>‹</button>\
                <button class='wt-btn wt-next'>›</button>\
              </div>";
          }
          
          // Add elements to comment div
          walkthrough.innerHTML = text + buttons;

          // Show comment div
          pre.appendChild(walkthrough);


          // BUTTON EVENTS
          if (comments.length > 1) {
            pre.querySelector('.wt-next').addEventListener("click", function() {
              Prism.plugins.walkthrough.showComment(pre, +1);
            })
            pre.querySelector('.wt-prev').addEventListener("click", function() {
              Prism.plugins.walkthrough.showComment(pre, -1);
            })
          }

        }

        // Show first comment
        Prism.plugins.walkthrough.showComment(pre);

      });
    }
  }
  
  Prism.plugins.walkthrough.init();
  
}
