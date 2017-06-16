$(document).ready(function () {
    var files;
    $("#submit-btn").click(function (event) {
        var token = $("#token").val().trim();
        var mpns = $("#mpns").val().trim();
        console.log(token);
        event.preventDefault();
        var mpnArray = [];
        var errorArray = [];
        mpnArray.push(mpns.split(","));
        console.log(mpnArray);
        $.each(mpnArray, function (i, val) {
            console.log(val);
            var dataPost = {
                token: token,
                data: val
            }
            $.ajax({
                method: "POST",
                url: "/sendmpns",
                data: dataPost,
                success: function (response) {
                    console.log(response);
                    errorArray.push(response);
                },
                error: function (error) {
                    console.log(error);
                    errorArray.push(error);
                },
            });
            if (mpnArray.length === i + 1 && errorArray.length === 0) {
                $("#status-area").html("Process is Complete!");
            }
            else if (mpnArray.length === i + 1 && errorArray.length > 0){
                $("#status-area").html("Please Try Again. There was an error!");
            }
        });
    });
   
});