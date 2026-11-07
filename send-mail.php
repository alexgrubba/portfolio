<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot anti-spam check
$honey = isset($_POST['_honey']) ? trim((string)$_POST['_honey']) : '';
if ($honey !== '') {
    echo json_encode(['success' => true]);
    exit;
}

$name    = isset($_POST['name']) ? trim((string)$_POST['name']) : '';
$email   = isset($_POST['email']) ? trim((string)$_POST['email']) : '';
$message = isset($_POST['message']) ? trim((string)$_POST['message']) : '';
$budget  = isset($_POST['budget']) ? trim((string)$_POST['budget']) : '';

// Prevent header injection
$cleanName  = str_replace(["\r", "\n", "%0a", "%0d"], '', $name);
$cleanEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

if ($cleanName === '' || !filter_var($cleanEmail, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input fields']);
    exit;
}

$to = 'oddprojects@alex-agency.pl';
$subjectText = "Nowa wiadomość z portfolio: " . $cleanName;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$encodedSenderName = '=?UTF-8?B?' . base64_encode($cleanName) . '?=';

$dateStr = date('Y-m-d H:i:s');

$bodyLines = [
    "Nowa wiadomość z formularza kontaktowego na stronie alex-agency.pl",
    "------------------------------------------------------------------",
    "Imię i nazwisko: " . $cleanName,
    "Adres e-mail:    " . $cleanEmail,
];

if ($budget !== '') {
    $bodyLines[] = "Budżet:          " . $budget;
}

$bodyLines[] = "Data wysłania:   " . $dateStr;
$bodyLines[] = "------------------------------------------------------------------";
$bodyLines[] = "";
$bodyLines[] = "Treść wiadomości:";
$bodyLines[] = $message;
$bodyLines[] = "";
$bodyLines[] = "--";
$bodyLines[] = "Aby odpowiedzieć nadawcy, kliknij 'Odpowiedz' (Reply-To: " . $cleanEmail . ").";

$body = implode("\r\n", $bodyLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Portfolio Alex Grubba <oddprojects@alex-agency.pl>',
    'Reply-To: ' . $encodedSenderName . ' <' . $cleanEmail . '>',
    'X-Mailer: AlexGrubba-Portfolio-Mailer'
];

$sent = @mail($to, $encodedSubject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'method' => 'php']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail function failed']);
}
