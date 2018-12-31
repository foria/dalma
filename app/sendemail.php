<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// //Load Composer's autoloader
//require 'http://dalmabp.com/m3q/autoload.php';
/*
mPDF: Generate PDF from HTML/CSS (Complete Code)
*/

// require_once( 'mpdf/mpdf.php'); // Include mdpf
// $stylesheet = file_get_contents('assets/css/pdf.css'); // Get css content
// $html = '<div id="pdf-content">
//               Your PDF Content goes here (Text/HTML)
//          </div>';

// // Setup PDF
// $mpdf = new mPDF('utf-8', 'A4-L'); // New PDF object with encoding & page size
// $mpdf->setAutoTopMargin = 'stretch'; // Set pdf top margin to stretch to avoid content overlapping
// $mpdf->setAutoBottomMargin = 'stretch'; // Set pdf bottom margin to stretch to avoid content overlapping
// // PDF header content
// $mpdf->SetHTMLHeader('<div class="pdf-header">
//                           <img class="left" src="assets/img/pdf_header.png"/>
//                       </div>');
// // PDF footer content
// $mpdf->SetHTMLFooter('<div class="pdf-footer">
//                         <a href="http://www.lubus.in">www.lubus.in</a>
//                       </div>');

// $mpdf->WriteHTML($stylesheet,1); // Writing style to pdf
// $mpdf->WriteHTML($html); // Writing html to pdf

// // FOR EMAIL
// $content = $mpdf->Output('', 'S'); // Saving pdf to attach to email
// $content = chunk_split(base64_encode($content));

$filename = 'foo.txt';

if (file_exists($filename)) {
    //echo "The file $filename exists";
} else {
    //echo "The file $filename does not exist";

    // Email settings
    // ini_set( 'display_errors', 1 );
    // error_reporting( E_ALL );
    // $mailto = 'foriaa@gmail.com';
    // $from_name = 'PDF Test';
    // $from_mail = 'test@dalmabp.com';
    // $replyto = 'test@dalmabp.com';
    // $uid = md5(uniqid(time()));
    // $subject = 'mdpf email with PDF';
    // $message = 'Download the attached pdf';
    // $filename = 'lubus_mpdf_demo.pdf';

    // $header = "From: ".$from_name." <".$from_mail.">\r\n";
    // $header .= "Reply-To: ".$replyto."\r\n";
    // $header .= "MIME-Version: 1.0\r\n";
    // $header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";
    // $header .= "This is a multi-part message in MIME format.\r\n";
    // $header .= "--".$uid."\r\n";
    // $header .= "Content-type:text/plain; charset=iso-8859-1\r\n";
    // $header .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    // $header .= $message."\r\n\r\n";
    // $header .= "--".$uid."\r\n";

    // $header .= "Content-Type: application/pdf; name=\"".$filename."\"\r\n";
    // $header .= "Content-Transfer-Encoding: base64\r\n";
    // $header .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";

    // $header .= $content."\r\n\r\n";
    // $header .= "--".$uid."--";
    // $is_sent = @mail($mailto, $subject, "YO", $header);

    //$mpdf->Output(); // For sending Output to browser
    //$mpdf->Output('lubus_mdpf_demo.pdf','D'); // For Download

    //exit;

    //use PHPMailer\PHPMailer\PHPMailer;
    //require 'vendor/autoload.php';
    $mailprog = '/usr/local/sbin/sendmail -oi -t';
    $mail = new PHPMailer;
    $mail->isSMTP();
    //$mail->SMTPDebug = 2;
    $mail->Host = 'secureit6.sgcpanel.com';
    $mail->Port = '587';
    $mail->SMTPAuth = true;
    $mail->Username = 'm3q-result@dalmabp.com';
    $mail->Password = '3qr=ZkN7(tcq';
    $mail->setFrom('m3q-result@dalmabp.com', 'M3Q Result');
    $mail->addReplyTo('m3q-result@dalmabp.com', 'M3Q Result');
    $mail->addAddress('foriaa@gmail.com', 'Yo');
    $mail->Subject = 'PHPMailer SMTP message';
    //$mail->msgHTML(file_get_contents('message.html'), __DIR__);
    $mail->msgHTML('test');
    $mail->AltBody = 'This is a plain text message body';
    $mail->addAttachment('foo.txt');
    if (!$mail->send()) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message sent!';
    }
}
?>
