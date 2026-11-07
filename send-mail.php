<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// 1. Honeypot anti-spam check (_honey + website trap)
$honey   = isset($_POST['_honey']) ? trim((string)$_POST['_honey']) : '';
$webTrap = isset($_POST['website']) ? trim((string)$_POST['website']) : '';
if ($honey !== '' || $webTrap !== '') {
    echo json_encode(['success' => true]);
    exit;
}

// 2. Time-trap check (< 2 seconds since page load = automated bot)
$formTs = isset($_POST['_form_ts']) ? (int)$_POST['_form_ts'] : 0;
if ($formTs > 0 && ((int)(microtime(true) * 1000) - $formTs) < 2000) {
    echo json_encode(['success' => true]);
    exit;
}

// 3. Raw input extraction
$rawName   = isset($_POST['name']) ? trim((string)$_POST['name']) : '';
$rawEmail  = isset($_POST['email']) ? trim((string)$_POST['email']) : '';
$rawMsg    = isset($_POST['message']) ? trim((string)$_POST['message']) : '';
$rawBudget = isset($_POST['budget']) ? trim((string)$_POST['budget']) : '';

// 4. Prevent header injection & validate email via filter_var()
$cleanEmail = filter_var(
    str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $rawEmail),
    FILTER_SANITIZE_EMAIL
);

if ($rawName === '' || !filter_var($cleanEmail, FILTER_VALIDATE_EMAIL) || $rawMsg === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input fields']);
    exit;
}

// 5. Sanitize text fields with htmlspecialchars() + strip CR/LF from header-used fields
$headerSafeName = str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], ' ', $rawName);
$safeName       = htmlspecialchars($headerSafeName, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMsg        = htmlspecialchars($rawMsg, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeBudget     = htmlspecialchars(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], ' ', $rawBudget), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$to = 'oddprojects@alex-agency.pl';
$subjectText = "Nowa wiadomość z portfolio: " . $safeName;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$encodedSenderName = '=?UTF-8?B?' . base64_encode($safeName) . '?=';

$dateStr = date('Y-m-d H:i:s');

$bodyLines = [
    "Nowa wiadomość z formularza kontaktowego na stronie alex-agency.pl",
    "------------------------------------------------------------------",
    "Imię i nazwisko: " . $safeName,
    "Adres e-mail:    " . $cleanEmail,
];

if ($safeBudget !== '') {
    $bodyLines[] = "Budżet:          " . $safeBudget;
}

$bodyLines[] = "Data wysłania:   " . $dateStr;
$bodyLines[] = "------------------------------------------------------------------";
$bodyLines[] = "";
$bodyLines[] = "Treść wiadomości:";
$bodyLines[] = $safeMsg;
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
