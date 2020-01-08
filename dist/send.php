<?php

$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$userEmail = $_POST['userEmail'];
$customerName = $_POST['customerName'];
$customerPhone = $_POST['customerPhone'];
$clientName = $_POST['clientName'];
$clientPhone = $_POST['clientPhone'];
$clientQuestion = $_POST['clientQuestion'];

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->CharSet = 'utf-8';

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'burdukoaskijvladislav@gmail.com';               // SMTP username
    $mail->Password   = '89385143014aa';                        // SMTP password
    $mail->SMTPSecure = 'ssl';            // Enable TLS encryption; 
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('burdukoaskijvladislav@gmail.com', 'Владислав');
    $mail->addAddress('burdukovskij.vlad@mail.ru');     // Add a recipient
    
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "New order";
    $mail->Body    = "Имя пользователя ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail} Его вопрос: ${userQuestion}";
    
    $mail->send();
    // header('Location: index.html');

// Проверяем результат отправки
    if ($mail->send()) {
        echo "Форма успешно отправлена";
    } else {
        echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
    }

    } catch (Exception $e) {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
?>