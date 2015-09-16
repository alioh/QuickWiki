if (Meteor.isClient) {
  Template.mainContent.helpers({
    summary: function () {
      Meteor.call('wiki', function (error, result) {
        Session.set("test", result);
      });
      return maintopic;
    }
  });

  Template.mainInput.events({
    'click #topicButton': function (e) {
      e.preventDefault();
      var topic = $('#topicInput').val();
      Session.set("test", topic);
      
      $('#topicInput').val('');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.methods({
        wiki: function() {
            var wikiTest = Scrape.wikipedia 'avengers', 'en', ['film']
            return wikiTest;
        },
    });
  });
}
