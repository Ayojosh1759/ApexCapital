$(document).ready(function(){
	// alert("hello");
	//Registration Field
	$("#registration_form").submit(function(e){
		e.preventDefault();
		var email = $("#email").val();
		var password = $("#password").val();
		var confirm_password = $("#cpassword").val();
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(password != confirm_password){
			toastr.error("Your password does not match!", "Password Match!");
			return false;
		}else if(!re.test(email)){
		    toastr.error("Email Typed Wrongly", "Wrong Email Format!");
			return false;
		}
			$("#registration_btn").text("Registering...");
			$("#registration_btn").attr("disabled", true);
			//Form Submission via Ajax
			$.ajax({
				url: "../auth/data-control.php",
				method: "post",
				data: $("#registration_form").serialize(),
				dataType: "text",
				success:function(status){
					var status = $.trim(status);
					if(status == 'found'){
							$("#registration_btn").text("Create Account");
							$("#registration_btn").attr("disabled", false);
						toastr.info("Email Found!", "Your email address has already been registered!");
					}
					else if(status == 'success'){
					$("#registration_btn").text("Registered");
						toastr.success("Registration Successful!", "Welcome to our platform. Please Wait!");
						$("#registration_form")[0].reset();
						setTimeout(function(){
							window.location="../login";
						},4000);
					}
					else{
							$("#registration_btn").text("Register");
							$("#registration_btn").attr("disabled", false);
						toastr.error("Failed!", "Registration process was not successful!");
					}
				}
			});
	});

		//Login Field
	$("#login_form").submit(function(e){
		e.preventDefault();
		var login_email = $("#login_email").val();
		var login_password = $("#login_password").val();
			$("#um-submit-btn").text("Please Wait...");
			$("#um-submit-btn").attr("disabled", true);

			var data = 'login_email=' + login_email + '&login_password=' + login_password;
			//Form Submission via Ajax
			$.ajax({
				url: "../auth/data-control.php",
				method: "post",
				data: data,
				dataType: "text",
				success:function(status){
					var status = $.trim(status);
					if(status == 'log_failed'){
					$("#um-submit-btn").text("Login Account");
					$("#um-submit-btn").attr("disabled", false);
						toastr.error("Wrong Email Address!", "Login Failed!");
					}
					else if(status == 'log_failed2'){
					$("#um-submit-btn").text("Login Account");
					$("#um-submit-btn").attr("disabled", false);
						toastr.error("Invalid account password!", "Failed!");
					}
					else if(status == 'no_vf'){
					$("#um-submit-btn").text("Login Account");
					$("#um-submit-btn").attr("disabled", false);
						toastr.info("Account has been not verified!", "Account Verifification Failed!");
					}
					else if(status == 'log_success'){
					$("#um-submit-btn").text("Login Successful");
						toastr.success("Your login was successful!", "Success!");
							window.location.href="../dashboard/";
					}
				}
			});
	});


	//contact Field
	$("#recover_form").submit(function(e){
		e.preventDefault();
		var recover_email = $("#recover_email").val();
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(!re.test(recover_email)){
		    toastr.error("Wrong Email Format!", "Wrong Email Format!");
			return false;
		}
			$("#um-submit-btn").text("Please Wait...");
			$("#um-submit-btn").attr("disabled", true);
			//Form Submission via Ajax
			$.ajax({
				url: "../wp-content/auth/data-control.php",
				method: "post",
				data: $("#recover_form").serialize(),
				dataType: "text",
				success:function(status){
					var status = $.trim(status);
					if(status == 'failed'){
					$("#um-submit-btn").text("Login");
					$("#um-submit-btn").attr("disabled", false);
						toastr.error("Login Failed!", "Email or password is incorrect!");
					}
					else if(status == 'notfound'){
					$("#um-submit-btn").text("Send Token");
					$("#um-submit-btn").attr("disabled", false);
						toastr.error("Error!", "Email Address Not Found!");
					}
					else if(status == 'success'){
					$("#um-submit-btn").text("Send Token");
						toastr.error("Successful!", "Token has been sent to your email address");
					}
				}
			});
	});

	$.ajax({
				url: "wp-content/auth/data-control.php",
				method: "post",
				data: 'fetch_act_dep_with=' + 'fetch_act_dep_with',
				dataType: "json",
				success:function(status){
					var len = status.length
					if (len > 0) {
						$("#withdrawal_tbl").html('');
					for (var i=0;i<len;i++) {
						$("#withdrawal_tbl").append("<tr><td id='bit-l-price'>"+status[i].wname+"</td><td id='bit-per'>$"+status[i].wamount+"</td><td><img src='wp-content/uploads/btc.png'/></td></tr>")
					}
				}

					}
				});


			$.ajax({
				url: "wp-content/auth/data-control.php",
				method: "post",
				data: 'fetch_act_dep=' + 'fetch_act_dep',
				dataType: "json",
				success:function(qry){
					var len = qry.length
					if (len > 0) {
						$("#deposit_tbl").html('');
						for (var i=0;i<len;i++) {
							$("#deposit_tbl").append("<tr><td id='bit-l-price'>"+qry[i].dname+"</td><td id='bit-per'>$"+qry[i].damount+"</td><td><img src='wp-content/uploads/btc.png'/></td></tr>")
						}
					}

					}
				});
});
