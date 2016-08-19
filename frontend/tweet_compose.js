class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on("submit", this.handleSubmit.bind(this));
  }

  handleSubmit() {
    debugger
    $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $('.tweet-compose').serializeJSON(),
        dataType: 'json',
        success(data) {
          console.log(data);
        }
    });
  }
}


module.exports = TweetCompose;
