











     // trigger when login form is submitted
    $(document).on('submit', '#login_form', function () {

        // get form data
        var login_form = $(this);
        console.log($('input[name=login_form_Username]').val());
        var json_raw_data = {
            "Username": $('input[name=login_form_Username]').val(),
            "Password": $('input[name=login_form_Password]').val(),
        };
        var form_data = JSON.stringify(json_raw_data);
        $('.loader__container').css('display', 'block');
        console.log(form_data);
        // submit form data to api
        $.ajax({
            url: "https://finalyearp.herokuapp.com/login",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function (result) {

                // store jwt to cookie
                // setCookie("jwt", result.jwt, 1);
               console.log(result);
               localStorage.setItem('token', result.token);
                // show home page & tell the user it was a successful login
                 window.location = "../demo_1/index.html";
                // $('#response').html("<div class='alert alert-success'>Successful login.</div>");
               
                $('.loader__container').css('display', 'none');
            },
            error: function (xhr, resp, text) {
                // on error, tell the user login has failed & empty the input boxes
                $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
                login_form.find('input').val('');
                $('.loader__container').css('display', 'none');
            }
        });

        return false;
    });


