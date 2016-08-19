function FollowToggle (el, options) {
  this.$el = $(el);
  this.userId = (this.$el.data("user-id") || options.userId);
  this.followState = (this.$el.data("initial-follow-state") || options.followState);
  this.render();
  this.handleClick();
}

 FollowToggle.prototype.render = function() {
  //  debugger;
   if (this.followState === "followed") {
     this.$el.text("Unfollow!");
   }
   else if (this.followState === "unfollowed") {
       this.$el.text("Follow!");
   } else {
     this.$el.prop("disabled", true);
   }
 };

FollowToggle.prototype.toggle = function() {
  if (this.followState === "followed" || this.followState === "unfollowing") {
    this.followState = "unfollowed";
  }
  else if (this.followState === "unfollowed" || this.followState === "following") {
    this.followState = "followed";
  }
  this.render();
};

 FollowToggle.prototype.handleClick = function() {
   this.$el.on("click", (event) => {
      // debugger
      event.preventDefault();
      if (this.followState === "followed") {
        this.followState = "unfollowing";
           this.$el.text("unfollowing");
      } else if (this.followState === "unfollowed") {
        this.followState = "following";
        this.$el.text("following");
      }
      this.render();
      let that = this;
      $.ajax({
        type: `${that.followState === "unfollowing" ? 'DELETE' : 'POST'}`,
        url: `/users/${that.userId}/follow`,
        dataType: "json",
        success(data) {
          that.$el.prop("disabled", false);
          that.toggle();
        }
      });
    });
 };


module.exports = FollowToggle;
