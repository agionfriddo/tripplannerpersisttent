'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var days = [],
      currentDay;

  // jQuery selections

  var $addButton, $removeButton, $optionsPanel;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
    $optionsPanel = $('#options-panel');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', postDay);
    $removeButton.on('click', deleteCurrentDay);
    // $optionsPanel.on('click', 'button[data-action="add"]', function() {
    //   console.log('???')
    // } )
  });


  

  function addDay (dayInfo) {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    var newDay = dayModule.create(dayInfo); // dayModule
    // { number: days.length + 1 }
    days.push(newDay);
    if (days.length === 1) {
      currentDay = newDay;
    }
    switchTo(newDay);
  }

  $.ajax({
    method: 'GET',
    url: '/api/days'
  })
  .then(function(days) {
    days.forEach(function(day) {
      console.log('day in trips', day)
      addDay(day);
    })
  })
  .catch(console.error)

  var postDay = function() {
    $.ajax({
        method: 'POST',
        url: '/api/days',
        data: {
          number: days.length + 1
        }
      })
      .then(function(value) {
        addDay(value);
      })
      .catch(console.error);
    }


  // var postHotel = function() {
  //   $.post('/api/days/' + currentDay.number + '/hotel', {hotelId: })
  //   .then(successHandler)
  //   .catch(failureHandler);
  // }




  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    // fix the remaining day numbers
    days.forEach(function (day, i) {
      day.setNumber(i + 1);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  // globally accessible module methods

  var publicAPI = {

    // load: function () {
    //   $(addDay);
    // },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    },

    currentDay: currentDay
  };

  return publicAPI;

}());
