// ADMIN DASHBOARD LOGIC - LIEN CHIEU REGIONAL MEDICAL CENTER

// Check credentials on load
const token = localStorage.getItem('clinical_token');
const user = JSON.parse(localStorage.getItem('clinical_user') || '{}');

if (!token || user.role !== 'admin') {
  alert('Bạn không có quyền truy cập trang quản trị! Vui lòng đăng nhập với tài khoản Admin.');
  window.location.href = 'index.html';
}

// Global Chart variables to avoid duplication errors on redraw
let ksnkChartInstance = null;
let calcChartInstance = null;

// DOM Elements
const btnAdminLogout = document.getElementById('btn-admin-logout');
const createUserForm = document.getElementById('create-user-form');
const regFullnameInput = document.getElementById('reg-fullname');
const regUsernameInput = document.getElementById('reg-username');
const regPasswordInput = document.getElementById('reg-password');
const regRoleSelect = document.getElementById('reg-role');
const usersListContainer = document.getElementById('users-list-container');
const auditLogTbody = document.getElementById('audit-log-tbody');

// Cards stats
const statTotalUsers = document.getElementById('stat-total-users');
const statClinicalChecks = document.getElementById('stat-clinical-checks');
const statKsnkChecks = document.getElementById('stat-ksnk-checks');
const statTotalCalculations = document.getElementById('stat-total-calculations');

// --- INITIALIZE PAGE ---
document.addEventListener('DOMContentLoaded', () => {
  fetchDashboardData();
  fetchUsersList();
  
  // Logout event
  btnAdminLogout.addEventListener('click', () => {
    localStorage.removeItem('clinical_token');
    localStorage.removeItem('clinical_user');
    window.location.href = 'index.html';
  });

  // Create user event
  createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await registerNewUser();
  });
});

// Fetch stats data and draw dashboard
async function fetchDashboardData() {
  try {
    const res = await fetch('/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.status === 401 || res.status === 403) {
      alert('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
      window.location.href = 'index.html';
      return;
    }

    if (!res.ok) throw new Error('Không thể lấy số liệu thống kê.');

    const data = await res.json();
    
    // 1. Populate summary cards
    statTotalUsers.textContent = data.summary.totalUsers;
    statClinicalChecks.textContent = data.summary.clinicalChecks;
    statKsnkChecks.textContent = data.summary.ksnkChecks;
    statTotalCalculations.textContent = data.summary.totalCalculations;

    // 2. Draw Charts
    drawKsnkChart(data.ksnkDistribution);
    drawCalculatorsChart(data.calculatorsDistribution);

    // 3. Render Audit log timeline
    renderAuditLog(data.auditLog);

  } catch (error) {
    console.error('Lỗi tải dữ liệu Dashboard:', error);
  }
}

// Fetch lists of registered users
async function fetchUsersList() {
  try {
    const res = await fetch('/api/auth/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    const users = await res.json();
    
    usersListContainer.innerHTML = '';
    users.forEach(u => {
      const isCurAdmin = u.username === 'admin';
      const userItem = document.createElement('div');
      userItem.className = 'flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100 text-xxs';
      userItem.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="h-6 w-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
            ${u.fullname.charAt(0)}
          </div>
          <div>
            <p class="font-bold text-slate-700">${u.fullname}</p>
            <p class="text-slate-400">@${u.username}</p>
          </div>
        </div>
        <span class="px-2 py-0.5 rounded font-bold ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'}">
          ${u.role === 'admin' ? 'Admin' : 'Staff'}
        </span>
      `;
      usersListContainer.appendChild(userItem);
    });
  } catch (error) {
    console.error('Lỗi tải danh sách người dùng:', error);
  }
}

// Register new staff account
async function registerNewUser() {
  const fullname = regFullnameInput.value.trim();
  const username = regUsernameInput.value.trim().toLowerCase();
  const password = regPasswordInput.value.trim();
  const role = regRoleSelect.value;

  if (password.length < 6) {
    alert('Mật khẩu tối thiểu phải từ 6 ký tự trở lên.');
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, password, fullname, role })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Có lỗi xảy ra khi đăng ký tài khoản.');
      return;
    }

    alert('Tài khoản nhân viên mới đã được tạo thành công!');
    createUserForm.reset();
    
    // Refresh user lists and cards stats
    fetchDashboardData();
    fetchUsersList();
  } catch (error) {
    console.error('Lỗi tạo tài khoản mới:', error);
    alert('Không thể kết nối đến máy chủ.');
  }
}

// Draw bar chart for Infection Control progress
function drawKsnkChart(ksnkDistribution) {
  const ksnkLabelsMap = {
    ve_sinh_tay: 'Vệ sinh tay',
    ppe_cach_ly: 'PPE & Cách ly',
    moi_truong: 'Môi trường & Rác',
    khu_khuan: 'Khử & Tiệt khuẩn',
    goi_can_thiep: 'Gói Can thiệp'
  };

  // Pre-populate keys to make sure all 5 checklists are drawn even if count is 0
  const distributionMap = {
    ve_sinh_tay: 0,
    ppe_cach_ly: 0,
    moi_truong: 0,
    khu_khuan: 0,
    goi_can_thiep: 0
  };

  ksnkDistribution.forEach(item => {
    if (distributionMap[item.id] !== undefined) {
      distributionMap[item.id] = parseInt(item.count);
    }
  });

  const labels = Object.values(ksnkLabelsMap);
  const dataValues = Object.keys(ksnkLabelsMap).map(key => distributionMap[key]);

  const ctx = document.getElementById('ksnkChart').getContext('2d');
  
  if (ksnkChartInstance) {
    ksnkChartInstance.destroy();
  }

  ksnkChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Số đầu mục đạt tiêu chuẩn',
        data: dataValues,
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',  // Sky
          'rgba(16, 185, 129, 0.7)',  // Emerald
          'rgba(99, 102, 241, 0.7)',  // Indigo
          'rgba(245, 158, 11, 0.7)',  // Amber
          'rgba(244, 63, 94, 0.7)'    // Rose
        ],
        borderColor: [
          'rgb(14, 165, 233)',
          'rgb(16, 185, 129)',
          'rgb(99, 102, 241)',
          'rgb(245, 158, 11)',
          'rgb(244, 63, 94)'
        ],
        borderWidth: 1.5,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            precision: 0
          },
          grid: {
            color: '#f1f5f9'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Draw doughnut chart for calculators usage
function drawCalculatorsChart(calculatorsDistribution) {
  const scoreNameMap = {
    'CHA2DS2-VASc': 'CHA2DS2-VASc',
    'HAS-BLED': 'HAS-BLED',
    'sPESI': 'sPESI',
    'qSOFA': 'qSOFA',
    'SOFA': 'SOFA',
    'APGAR': 'APGAR',
    'CURB-65': 'CURB-65',
    'MEWS': 'MEWS'
  };

  const labels = [];
  const dataValues = [];
  const backgroundColors = [
    '#38bdf8', '#34d399', '#818cf8', '#fbbf24', '#f87171', '#a78bfa', '#f472b6', '#2dd4bf'
  ];

  calculatorsDistribution.forEach(item => {
    labels.push(item.type);
    dataValues.push(parseInt(item.count));
  });

  // If no calculation history yet, show placeholder labels
  if (labels.length === 0) {
    labels.push('Chưa có dữ liệu');
    dataValues.push(1);
    backgroundColors.splice(0, backgroundColors.length, '#e2e8f0');
  }

  const ctx = document.getElementById('calculatorsChart').getContext('2d');

  if (calcChartInstance) {
    calcChartInstance.destroy();
  }

  calcChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: {
              size: 10
            }
          }
        }
      },
      cutout: '60%'
    }
  });
}

// Render Audit log timeline table rows
function renderAuditLog(auditLog) {
  if (auditLog.length === 0) {
    auditLogTbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-8 text-center text-slate-400">
          Chưa ghi nhận hoạt động nào của nhân sự.
        </td>
      </tr>
    `;
    return;
  }

  // Map checklist ID to labels
  const checklistIdMap = {
    phong_mo: 'Checklist Phòng mổ',
    sbar: 'Bàn giao SBAR',
    truoc_phau_thuat: 'Kiểm Trước Phẫu Thuật',
    ve_sinh_tay: 'KSNK Vệ sinh tay',
    ppe_cach_ly: 'KSNK PPE & Cách ly',
    moi_truong: 'KSNK Môi trường & Rác',
    khu_khuan: 'KSNK Khử & Tiệt khuẩn',
    goi_can_thiep: 'KSNK Gói can thiệp'
  };

  auditLogTbody.innerHTML = '';
  auditLog.forEach(log => {
    const dateObj = new Date(log.completed_at);
    const timeStr = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')} ${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
    
    let activityText = '';
    let categoryBadge = '';
    let taskName = '';

    if (log.type === 'clinical') {
      taskName = 'Checklist';
      activityText = `${checklistIdMap[log.checklist_id] || log.checklist_id} (Mục: ${log.item_id})`;
      categoryBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700">Lâm sàng</span>';
    } else if (log.type === 'ksnk') {
      taskName = 'KSNK Audit';
      activityText = `${checklistIdMap[log.checklist_id] || log.checklist_id} (Mục: ${log.item_id})`;
      categoryBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">Kiểm soát NK</span>';
    } else { // calc
      taskName = 'Tính Điểm';
      activityText = `Đánh giá thang điểm ${log.checklist_id}`; // score type is stored in checklist_id column
      categoryBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">Tính toán</span>';
    }

    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-100 hover:bg-slate-50/50 transition-colors';
    tr.innerHTML = `
      <td class="py-3 font-mono text-slate-400 text-[10px]">${timeStr}</td>
      <td class="py-3 font-bold text-slate-700">${taskName}</td>
      <td class="py-3 max-w-[200px] truncate" title="${activityText}">${activityText}</td>
      <td class="py-3">${categoryBadge}</td>
      <td class="py-3 font-semibold text-slate-700">${log.performer || 'Hệ thống'}</td>
    `;
    auditLogTbody.appendChild(tr);
  });
}
