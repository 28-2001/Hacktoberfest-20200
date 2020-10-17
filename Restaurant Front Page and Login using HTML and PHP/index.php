<?php 
	session_start(); 

	if (!isset($_SESSION['username'])) {
		$_SESSION['msg'] = "You must log in first";
		header('location: login.php');
	}

	if (isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['username']);
		header("location: login.php");
	}

?>
<!DOCTYPE html>
<html>
<head>
	<title>CANTEEN</title>

	<style type="text/css">

    a{
    text-decoration: none;  
    color: black; 
    }

     a:hover{
    color: red;
    }

   .test{
    text-decoration: underline;
   }
		.links{
			border-radius:"0px";
			
		}
		.links:hover{
			background-color: #FF8C00;
		}
		.center{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
	}
		.sfithead{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
	}
			.centerimg{
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
	}

* {box-sizing: border-box;}
body {font-family: Verdana, sans-serif;}
.mySlides {display: none;}
img {vertical-align: middle;}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;

}

td a {
  width: 100%;
  display: block;
}


/* The dots/bullets/indicators */
.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .text {font-size: 11px}
}
.tab-container{
  display: flex;
}
.tab-item1{
  flex:1;
  padding-left: 20px;
  background-color: orange;
}

	</style>

</head>
<body>
	<div class="logo">
		<img src="images.png" class="imagehead">
	</div>

	<div class="header">
		<h2>Home Page</h2>
	</div>
	
	<!-- logged in user information -->
		<?php  if (isset($_SESSION['username'])) : ?>
			<p>Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>
			<p> <a href="index.php?logout='1'" class="test" >logout</a> </p>
		<?php endif ?>


<div class="tab-container">
  <div class="tab-item1">
   <p><a href="menu.php"> MENU </a></p>
  </div>
  <div class="tab-item1">
    <p>ABOUT US</p>
  </div>
  <div class="tab-item1">
    <p>CONTACT US</p>
  </div>
  <div class="tab-item1">
    <P>FEEDBACK</P>
  </div>

</div>


	<div class="slideshow-container">

<div class="mySlides fade">
  
  <img src="missalpav.jpg" style="width:100%">

</div>

<div class="mySlides fade">
 
  <img src="biryani.jpg" style="width:100%">
  
</div>

<div class="mySlides fade">
  
  <img src="panipuri.jpg" style="width:100%">
 
</div>

</div>
<br>

<div style="text-align:center">
  <span class="dot"></span> 
  <span class="dot"></span> 
  <span class="dot"></span> 
</div>


<script>
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}
</script>

			

</body>
</html>