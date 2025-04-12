document.addEventListener('DOMContentLoaded', function() {
    fetch('status.json')
        .then(response => response.json())
        .then(data => {
            updateStatus(data);
        })
        .catch(error => {
            console.error('خطا در دریافت وضعیت:', error);
            document.getElementById('status-text').textContent = 'خطا در دریافت اطلاعات';
        });
});

function updateStatus(data) {
    const statusCircle = document.getElementById('status-circle');
    const statusText = document.getElementById('status-text');
    const lastActivity = document.getElementById('last-activity');
    const lastChecked = document.getElementById('last-checked');
    
    // به‌روزرسانی وضعیت
    switch(data.status) {
        case 'alive':
            statusCircle.className = 'circle alive';
            statusText.textContent = 'زنده';
            break;
        case 'presumed-dead':
            statusCircle.className = 'circle dead';
            statusText.textContent = 'احتمالاً فوت شده';
            break;
        default:
            statusCircle.className = 'circle unknown';
            statusText.textContent = 'نامشخص';
    }
    
    // به‌روزرسانی زمان‌ها
    if (data.lastActivity && data.lastActivity !== 'none') {
        const date = new Date(data.lastActivity);
        lastActivity.textContent = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    } else {
        lastActivity.textContent = 'هیچ فعالیتی ثبت نشده است';
    }
    
    if (data.lastChecked) {
        const date = new Date(data.lastChecked);
        lastChecked.textContent = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
}