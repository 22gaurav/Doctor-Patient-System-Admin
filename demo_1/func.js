var noti_counter_global=0;

var outercounter=0;

$(document).ready(function(){
 console.log("woow");
var tokendd=localStorage.getItem("token");

 $.ajax({
           url: "https://finalyearp.herokuapp.com/Allpatients",
            method: "GET",
          
           beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + tokendd)},
           
            success: function (result) {
                 console.log("woow entered");
        console.log(result);

        var disease_number=result.data.length;
        for(var m=0;m<disease_number;m++)
        {


           var ty="disease_name_ext"+(m+1);
             document.getElementById(ty).innerHTML=result.data[m].disease_name;
           var clinic_number= result.data[m].clinics.length; 
           for(var q=0;q<clinic_number;q++)
           {


var ty1=result.data[m].clinics[q].clinic_name;
var ty2=result.data[m].clinics[q].queue.length;
var idnameforlist="#list-edit"+(m+1);
var idnamequeue="#queuelist"+(m+1);
 $(idnameforlist).append(
                    '<li class="list-group-item">'+ty1+'</li>');
    $(idnamequeue).append(
                    '<li class="list-group-item">'+ty2+"  "+"Patient(s)"+'</li>');
}
}


            },
            error: function (xhr, resp, text) {
     
            }
        });




console.log("noti before");
setInterval(
    function(){ 
         
 
 $.ajax({
           url: "https://finalyearp.herokuapp.com/notifications",
            method: "GET",
          
           beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + tokendd)},
           
            success: function (result) {
              console.log("success noti");
              console.log(result);
              var noti_length=result.data.length;
                 var noti_actual_length=noti_length-outercounter;
                 noti_counter_global=noti_length;
                
              document.getElementById("number_of_changes").innerHTML=noti_length;
              document.getElementById("noti_counter").innerHTML=noti_actual_length;
              for(var w=noti_length-1;w>0;w--)
              {
              var noti1=result.data[w].Notification;

             $("#noti_dropdown").append(
                    '<a class="dropdown-item preview-item">' +'<div class="preview-item-content d-flex align-items-start flex-column justify-content-center">'+'<h6>'+noti1 +'</h6>'+'</div>'+'</a>');
               
            $("#noti_dropdown").append(
                    '<div class="dropdown-divider"></div>');
          }
               },
            error: function (xhr, resp, text) {
     
            }
        });
    }, 
    1000
);


});
function notificationrecounted()
{
document.getElementById("noti_counter").innerHTML=outercounter;
outercounter=noti_counter_global;
}