const FollowToggle = require("./follow_toggle.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $("#search");
    this.$ul = $(".users");
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput() {
    let that = this;
    $.ajax({
      type: `GET`,
      url: `/users/search`,
      data: {query: `${that.$input.val()}`},
      dataType: "json",
      success(data) {
        that.renderResults(data);
      }
    });
  }

  renderResults(data) {
    this.$ul.empty();
    data.forEach( (user) => {
      let $li = $("<li>");
      this.$ul.append($li);
      $li.append(`<a href=${user.id}>${user.username}</a>`);
      let x = $('<button type="button" class="follow-toggle">');
      $li.append(x);
      // debugger
      new FollowToggle(x,
      {userId: user.id, followState: `${user.followed ? 'followed' : 'unfollowed'}`});
    });
  }

}//class


module.exports = UsersSearch;
