var options = {
    startTime:6,
    endTime:22
}
//update time slots when rendering the page
function updateTimeSlots(){
    var currentTime=moment().hour();
    $('.time-block').each(function(index,element){
     var hour = $(element).attr('data-hour');
     if(hour<currentTime){
        $(element).find('.description').addClass('past');
     }
     else if(hour==currentTime){
      $(element).find('.description').addClass('present');

     }
     else{
        $(element).find('.description').addClass('future');
     }

    });
   
}
 // Save the task user has entered
function onSaveTask(e){
    var hour=$(e.target).parent().parent().attr('data-hour');
    var task=$(e.target).parent().prev().children().val();

    localStorage.setItem(hour,task);
    console.log('saved');
}

//generate timeslots,textarea and savebutton for the page

function generateTimeslots(){
    for(var hour=options.startTime;hour<=options.endTime;hour++){
        //load items from local storage
        var storedTask=localStorage.getItem(hour);

        var timeSlot=$('<div>').addClass('row time-block');
        timeSlot.attr('data-hour',hour);

        var hourSlot=$('<div>').addClass('col-sm-2 hour');
        hourSlot.text(moment(hour ,'h').format('h A'));
        var description=$('<div>').addClass('col-sm-8 row');
        var textArea=$('<textarea>').addClass('col-md-12 description');
        textArea.val(storedTask);

        var saveContainer=$('<div>').addClass('col-sm-2 saveBtn d-flex justify=content-centre');
        saveContainer.on('click',onSaveTask);
        var saveButton=$('<i>').addClass('fas fa-save');

        timeSlot.append(hourSlot);
        timeSlot.append(description);
        description.append(textArea);
        timeSlot.append(saveContainer);
        saveContainer.append(saveButton);
        $('.container').append(timeSlot);
    }
}
//initialises the page
function init(){
    
    generateTimeslots();

    updateTimeSlots();
    var CurrentDayTime = moment().format('dddd MMMM Do YYYY ,h:mm:ss a');
    $('#currentDay').text(CurrentDayTime);

setInterval(function(){
    updateTimeSlots();
},10000);
}
init();