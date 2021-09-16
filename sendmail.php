<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);


	$mail->setFrom('info@fls.guru', 'Me');

	$mail->addAddress('pavelaleksiaichuk@gmail.com');

	$mail->Subject = 'Topic from site';

	$body = '<h1>Message</h1>';

	if(trim(!empty($_POST['name']))) {
		$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))) {
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['subject']))) {
		$body.='<p><strong>Subject:</strong> '.$_POST['subject'].'</p>'
	}
	if(trim(!empty($_POST['message']))) {
		$body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>'
	}


	if(!$mail->send()) {
		$message = 'Error';
	} else {
		$message = 'Data Sent!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>