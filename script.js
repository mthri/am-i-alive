document.addEventListener('DOMContentLoaded', function() {
    // مسیر status.json را نسبی قرار می‌دهیم
    fetch('status.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('خطا در دریافت فایل وضعیت');
            }
            return response.json();
        })
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
        
        // نمایش تعداد روزهای گذشته
        if (data.daysSinceActivity !== undefined) {
            const daysInfo = document.createElement('span');
            daysInfo.className = 'days-info';
            daysInfo.textContent = ` (${data.daysSinceActivity} روز پیش)`;
            
            if (data.daysSinceActivity >= 20 && data.daysSinceActivity < 30) {
                daysInfo.className += ' warning';
            } else if (data.daysSinceActivity >= 30) {
                daysInfo.className += ' danger';
            }
            
            lastActivity.appendChild(daysInfo);
        }
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