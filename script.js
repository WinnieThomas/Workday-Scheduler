var options = {
    startTime:6,
    endTime:22
}

function updateTimeSlots(){
   
}
function generateTimeslots(){
    for(var hour=startTime;hour<=endTime;hour++){
        //load items from local storage
        var storedTask=localStorage.getItem(hour);

        var timeSlot=$('<div>').addClass('row time-block');
        timeSlot.attr('data-hour',hour);

        var hourSlot=$('<div').addClass('col-sm-3 hour')
        hourSlot.text(moment(hour ,'h').format('h A'));
        var description=$('<div').addClass('col-sm-8 row');
        var textArea=$('<textarea>').addClass('col-md-12 description');
        textArea.val(storedTask);

        var saveContainer=$('<div>').addClass('col-sm-2 saveBtn d-flex justify=content-centre');
        saveContainer.on('click',onSaveTask);
    }
}

function init(){
    updateTimeSlots();
    generateTimeslots();
    var CurrentDayTime = moment().format('dddd MMMM Do YYYY ,h:mm:ss a');
    $('#currentDay').text(CurrentDayTime);

setInterval(function(){
    updateTimeSlots();
},10000);
}
init();