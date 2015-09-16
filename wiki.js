
if (Meteor.isClient) {
  Template.mainContent.helpers({
    summary: function () {
      var data = {
        title: Session.get("title"),
        summ: Session.get("summ") || "You didn't pick a topic yet!"
      }
      return data;
    }
  });

  Template.mainInput.events({
    'click #topicButton': function (e) {
      e.preventDefault();
      var topic = $('#topicInput').val();
      var language = "en"
      Session.set("test", topic);
      var summary = Meteor.call("wiki", topic, language);
      Meteor.call('wiki', topic, function (error, result) {
       Session.set("summ", result.summary);
       Session.set("title", result.title);
      });
      $('#topicInput').val('');
    }
  });
}

Meteor.methods({
    wiki: function(topic, language) {
        var wikiTest = Scrape.wikipedia(topic, language);
        return wikiTest;
    },
});