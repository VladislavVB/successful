<?php
$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$userEmail = $_POST['userEmail'];
$userQuestion = $_POST['userQuestion'];
// Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.yandex.ru';                       // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'vladburdukovsky@yandex.ru';               // SMTP username
    $mail->Password   = '89385143014';                        // SMTP password
    $mail->SMTPSecure = 'ssl';            // Enable TLS encryption; 
    $mail->Port       = 465;                                    // TCP port to connect to
    //Recipients
    $mail->setFrom('vladburdukovsky@yandex.ru', 'Владислав');
    $mail->addAddress('vlad.burdukoasky@yandex.ru');     // Add a recipient
    
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "New order";
    $mail->Body    = "Имя пользователя ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail} Его вопрос: ${userQuestion}";
    //проверяяем отправленность сообщения
if ($mail->send()) {
   echo: "Форма успешно отправлена";
} else {
    echo "Письмо не отправлено, неверная почта ";
}
} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}