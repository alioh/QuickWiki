
if (Meteor.isClient) {
  Template.mainContent.helpers({
    summary: function () {
      var summarycode = Session.get("summ");
      var summ = summarycode.replace(/(<([^>]+)>)/ig,"");
      var data = {
        title: Session.get("title"),
        summ: summ,
        imageurl: Session.get("imageurl")
      }
      return data;
      }
  });

  Template.mainInput.events({
    'click #topicButton': function (e) {
      var topic = $('#topicInput').val();
      var language = "en";
      var summary = Meteor.call("wiki", topic, language);
      Meteor.call('wiki', topic, function (error, result) {
        if ( _.isEmpty(result)) {
        Session.set("title", "Not found");
        Session.set("summ", "");
        Session.set("imageurl", "/images/notfound.png")
      } else {
        Session.set("summ", result.summary);
        Session.set("title", result.title);
        Session.set("imageurl", result.image.url)
      }
      });
      $('#topicInput').val('');
    }
  });
}

Meteor.methods({
    wiki: function(topic, language) {
      if(language !== "en"){
        var wikiTest = Scrape.wikipedia(topic, language);
      } else {
        var wikiTest = Scrape.wikipedia(topic);
      }
      return wikiTest;
    },
});