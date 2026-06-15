// CLINICAL & KSNK WEB APPLICATION LOGIC - LIEN CHIEU REGIONAL MEDICAL CENTER

// --- 1. CLINICAL CHECKLIST TEMPLATES ---
const CLINICAL_TEMPLATES = {
  phong_mo: {
    title: "Bảng kiểm Phòng mổ (WHO)",
    description: "Bảng kiểm an toàn phẫu thuật chuẩn WHO (WHO Surgical Safety Checklist) nhằm phòng ngừa sai sót, sự cố y khoa trong phòng mổ.",
    sections: [
      {
        name: "SIGN IN - TRƯỚC KHI GÂY MÊ (Bệnh nhân có mặt tại phòng mổ)",
        items: [
          { id: "signin_1", text: "Xác nhận danh tính người bệnh, vùng mổ, phương pháp mổ và sự đồng ý phẫu thuật." },
          { id: "signin_2", text: "Đánh dấu vùng phẫu thuật (nếu có chỉ định vùng mổ rõ ràng)." },
          { id: "signin_3", text: "Kiểm tra an toàn thiết bị gây mê, dụng cụ phẫu thuật và thuốc gây mê/mê hồi sức." },
          { id: "signin_4", text: "Thiết bị đo SpO2 (bão hòa oxy máu) đã được gắn trên bệnh nhân và hoạt động tốt." },
          { id: "signin_5", text: "Đánh giá nguy cơ mất máu của bệnh nhân (>500ml ở người lớn hoặc >7ml/kg ở trẻ em)." },
          { id: "signin_6", text: "Đánh giá nguy cơ đường thở khó hoặc sặc và chuẩn bị sẵn thiết bị hỗ trợ." }
        ]
      },
      {
        name: "TIME OUT - TRƯỚC KHI RẠCH DA (Kíp mổ dừng lại xác nhận chung)",
        items: [
          { id: "timeout_1", text: "Xác nhận tất cả các thành viên kíp phẫu thuật đã tự giới thiệu tên và vai trò." },
          { id: "timeout_2", text: "Xác nhận tên bệnh nhân, vùng mổ và phương pháp phẫu thuật dự kiến." },
          { id: "timeout_3", text: "Xác nhận kháng sinh dự phòng đã được dùng trong vòng 60 phút trước đó (hoặc không chỉ định)." },
          { id: "timeout_4", text: "Phẫu thuật viên dự báo các bước khẩn cấp ngoài kế hoạch, thời gian mổ và lượng máu mất." },
          { id: "timeout_5", text: "Kíp gây mê dự báo các tình huống cần lưu ý và kế hoạch hồi sức trong mổ." },
          { id: "timeout_6", text: "Điều dưỡng phòng mổ xác nhận dụng cụ vô trùng, chỉ số kiểm tra nhiệt độ đạt tiêu chuẩn." },
          { id: "timeout_7", text: "Phim ảnh chẩn đoán hình ảnh cần thiết đã được hiển thị đầy đủ trong phòng mổ." }
        ]
      },
      {
        name: "SIGN OUT - TRƯỚC KHI BỆNH NHÂN RỜI PHÒNG MỔ",
        items: [
          { id: "signout_1", text: "Điều dưỡng xác nhận bằng lời tên phương pháp phẫu thuật đã thực hiện." },
          { id: "signout_2", text: "Đếm đủ số lượng dụng cụ, gạc, kim khâu (không bị thiếu hụt)." },
          { id: "signout_3", text: "Dán nhãn bệnh phẩm chính xác (bao gồm họ tên bệnh nhân, mã bệnh án, loại bệnh phẩm)." },
          { id: "signout_4", text: "Kiểm tra và ghi nhận các lỗi trang thiết bị y tế phát sinh trong ca mổ (nếu có)." },
          { id: "signout_5", text: "Phẫu thuật viên, bác sĩ gây mê và điều dưỡng thông qua kế hoạch hồi tỉnh và chăm sóc sau mổ." }
        ]
      }
    ]
  },
  sbar: {
    title: "Bàn giao SBAR (Handover)",
    description: "Công cụ giao tiếp SBAR (Situation - Background - Assessment - Recommendation) giúp bàn giao bệnh nhân an toàn giữa các ca trực hoặc khoa phòng.",
    sections: [
      {
        name: "S - SITUATION (Tình huống lâm sàng hiện tại)",
        items: [
          { id: "sbar_s1", text: "Xác nhận họ tên bệnh nhân, tuổi, giới, số phòng, số giường hiện tại." },
          { id: "sbar_s2", text: "Nêu rõ lý do bàn giao/lý do chuyển khoa hoặc tình trạng nhập viện." },
          { id: "sbar_s3", text: "Báo cáo tình trạng khẩn cấp hoặc các thay đổi lâm sàng đột ngột (nếu có)." }
        ]
      },
      {
        name: "B - BACKGROUND (Tiền sử và bối cảnh bệnh lý)",
        items: [
          { id: "sbar_b1", text: "Tóm tắt chẩn đoán chính khi nhập viện và các bệnh lý nền đi kèm." },
          { id: "sbar_b2", text: "Nêu rõ tiền sử dị ứng (thuốc, thức ăn, hóa chất...) của bệnh nhân." },
          { id: "sbar_b3", text: "Liệt kê các can thiệp phẫu thuật, thủ thuật hoặc thuốc truyền đặc biệt gần đây." }
        ]
      },
      {
        name: "A - ASSESSMENT (Đánh giá tình trạng hiện tại)",
        items: [
          { id: "sbar_a1", text: "Cung cấp dấu hiệu sinh tồn mới nhất: Mạch, Huyết áp, Nhịp thở, Nhiệt độ, SpO2." },
          { id: "sbar_a2", text: "Đánh giá tri giác (GCS/AVPU), mức độ đau (thang VAS) của bệnh nhân." },
          { id: "sbar_a3", text: "Xác định tình trạng các đường truyền tĩnh mạch, sonde tiểu, ống dẫn lưu và dịch truyền." },
          { id: "sbar_a4", text: "Thông báo kết quả cận lâm sàng bất thường cần lưu ý (X xét nghiệm máu, điện tim...)." }
        ]
      },
      {
        name: "R - RECOMMENDATION (Khuyến nghị và kế hoạch tiếp theo)",
        items: [
          { id: "sbar_r1", text: "Đề xuất kế hoạch theo dõi tiếp theo (tần suất sinh hiệu, xét nghiệm định kỳ)." },
          { id: "sbar_r2", text: "Nêu rõ các thuốc cần dùng tiếp theo, thời gian dùng thuốc cụ thể cho ca sau." },
          { id: "sbar_r3", text: "Nhấn mạnh các dấu hiệu nguy cơ cần báo cáo bác sĩ điều trị/trực ngay lập tức." }
        ]
      }
    ]
  },
  truoc_phau_thuat: {
    title: "Kiểm trước Phẫu thuật (Pre-operative)",
    description: "Bảng kiểm chuẩn bị bệnh nhân tại khoa phòng điều trị trước khi chuyển xuống phòng mổ.",
    sections: [
      {
        name: "1. HỒ SƠ & PHÁP LÝ",
        items: [
          { id: "pre_p1", text: "Hồ sơ bệnh án đầy đủ, đúng mẫu quy định bệnh viện." },
          { id: "pre_p2", text: "Giấy cam đoan phẫu thuật/thủ thuật và cam đoan gây tê/gây mê đã được ký bởi bệnh nhân hoặc người thân." },
          { id: "pre_p3", text: "Đầy đủ các xét nghiệm cận lâm sàng cơ bản (Công thức máu, Đông máu, Nhóm máu, ECG, X-quang phổi...)." }
        ]
      },
      {
        name: "2. CHUẨN BỊ BỆNH NHÂN",
        items: [
          { id: "pre_b1", text: "Xác minh thông tin vòng định danh đeo ở cổ tay bệnh nhân trùng khớp với bệnh án." },
          { id: "pre_b2", text: "Đảm bảo bệnh nhân nhịn ăn uống đúng quy định (ít nhất 6 tiếng thức ăn đặc, 2 tiếng nước trong)." },
          { id: "pre_b3", text: "Vùng mổ đã được vệ sinh sạch sẽ, cạo lông (nếu chỉ định) và được đánh dấu bởi phẫu thuật viên." },
          { id: "pre_b4", text: "Bệnh nhân đã tháo răng giả, đồ trang sức, kính áp tròng, kính cận và tẩy sơn móng tay/chân." },
          { id: "pre_b5", text: "Bệnh nhân mặc trang phục mổ sạch, đội mũ trùm tóc vô khuẩn và đi vệ sinh trước khi chuyển mổ." }
        ]
      },
      {
        name: "3. THUỐC VÀ DỤNG CỤ ĐI KÈM",
        items: [
          { id: "pre_t1", text: "Đã thực hiện các y lệnh thuốc tiền phẫu (kháng sinh dự phòng, thuốc huyết áp...) nếu có chỉ định." },
          { id: "pre_t2", text: "Chuẩn bị đầy đủ phim X-quang, MRI, CT scanner và máu truyền (nếu có dự trù)." }
        ]
      }
    ]
  }
};

// --- 2. INFECTION CONTROL (KSNK) CHECKLIST TEMPLATES (NEW) ---
const KSNK_TEMPLATES = {
  ve_sinh_tay: {
    title: "KSNK 1: Vệ sinh tay",
    description: "Đánh giá tuân thủ quy trình vệ sinh tay và chuẩn bị vật tư tại các điểm chăm sóc y tế.",
    items: [
      { id: "vst_1", text: "Có dung dịch sát khuẩn tay nhanh đặt sẵn tại điểm chăm sóc/đầu giường bệnh." },
      { id: "vst_2", text: "Bồn rửa tay hoạt động tốt, đầy đủ xà phòng và khăn giấy lau tay sạch dùng 1 lần." },
      { id: "vst_3", text: "Nhân viên y tế tuân thủ đúng 5 thời điểm vệ sinh tay theo quy định của Bộ Y tế." },
      { id: "vst_4", text: "Dung tích bình chứa nước rửa tay đạt chuẩn: nước thường &ge; 500ml hoặc dung dịch sát khuẩn &ge; 250ml." },
      { id: "vst_5", text: "Có bảng hướng dẫn quy trình rửa tay 6 bước của Bộ Y tế treo rõ ràng tại khu vực bồn rửa." }
    ]
  },
  ppe_cach_ly: {
    title: "KSNK 2: Trang thiết bị bảo hộ cá nhân (PPE) & Phòng ngừa cách ly",
    description: "Giám sát tính sẵn có và quy trình sử dụng bảo hộ lao động y tế, phòng ngừa lây truyền qua đường không khí/giọt bắn.",
    items: [
      { id: "ppe_1", text: "Khẩu trang y tế và khẩu trang N95 có sẵn đầy đủ kích cỡ phù hợp tại khoa phòng." },
      { id: "ppe_2", text: "Găng tay y tế sạch (không vô trùng) và găng tay vô trùng đủ các kích cỡ." },
      { id: "ppe_3", text: "Kính bảo hộ chắn giọt bắn hoặc tấm chắn mặt (face shield) sạch, sẵn sàng sử dụng." },
      { id: "ppe_4", text: "Áo choàng chống thấm (loại dùng một lần hoặc loại tái sử dụng đúng quy trình giặt vô khuẩn) đầy đủ." },
      { id: "ppe_5", text: "Khu vực cách ly có buồng đệm, nhà vệ sinh riêng (ưu tiên) và biển cảnh báo phòng ngừa thích hợp ngoài cửa." }
    ]
  },
  moi_truong: {
    title: "KSNK 3: Xử lý môi trường, đồ vải & chất thải",
    description: "Quản lý vệ sinh bề mặt lâm sàng, thu gom giặt là đồ vải nhiễm khuẩn và phân loại chất thải bệnh viện.",
    items: [
      { id: "env_1", text: "Thực hiện vệ sinh, lau khử khuẩn các bề mặt tiếp xúc thường xuyên (tay nắm cửa, giường bệnh, tủ cạnh giường) theo lịch trực." },
      { id: "env_2", text: "Đồ vải bẩn được thu gom, đóng gói trong túi màu quy định đúng quy trình, không làm rơi vãi ra sàn nhà." },
      { id: "env_3", text: "Phân loại chất thải y tế chính xác ngay tại nguồn (lây nhiễm, sắc nhọn, thông thường, hóa chất)." },
      { id: "env_4", text: "Thùng rác có nắp đậy, hoạt động đạp chân tốt, lót túi màu vàng (lây nhiễm) và màu xanh (thông thường)." },
      { id: "env_5", text: "Khu vực phát sinh kim tiêm/vật sắc nhọn được trang bị hộp nhựa/hộp giấy chống đâm thủng chuyên dụng." }
    ]
  },
  khu_khuan: {
    title: "KSNK 4: Khử khuẩn, tiệt khuẩn dụng cụ y tế",
    description: "Giám sát chu trình làm sạch, đóng gói và hấp tiệt trùng dụng cụ phẫu thuật, thủ thuật y tế.",
    items: [
      { id: "kk_1", text: "Dụng cụ y tế tái sử dụng được ngâm khử khuẩn, làm sạch cơ học và khử khuẩn mức độ cao đúng quy trình." },
      { id: "kk_2", text: "Mỗi mẻ hấp tiệt khuẩn (autoclave) đều có chỉ thị hóa học; thực hiện chỉ thị sinh học định kỳ theo quy định." },
      { id: "kk_3", text: "Dụng cụ sau tiệt trùng được lưu giữ trong tủ chuyên dụng khô ráo, bao bì đóng gói còn nguyên vẹn, trong hạn sử dụng." },
      { id: "kk_4", text: "Có sổ nhật ký ghi chép đầy đủ thông tin vận hành máy hấp (nhiệt độ, áp suất, thời gian, tên người vận hành)." },
      { id: "kk_5", text: "Dụng cụ nội soi ống mềm được khử khuẩn mức độ cao bằng hóa chất chuyên dụng trước mỗi ca thực hiện." }
    ]
  },
  goi_can_thiep: {
    title: "KSNK 5: Gói can thiệp dự phòng nhiễm khuẩn (Care Bundles)",
    description: "Đánh giá việc áp dụng đồng bộ các biện pháp can thiệp ngăn ngừa các nhiễm khuẩn bệnh viện phổ biến nhất.",
    items: [
      { id: "bundle_clabsi", text: "Dự phòng CLABSI (Catheter trung tâm): Vệ sinh tay, sát trùng da bằng Chlorhexidine 2%, phủ săng vô khuẩn lớn, chọn vị trí đặt tối ưu, thay băng định kỳ." },
      { id: "bundle_vap", text: "Dự phòng VAP (Viêm phổi thở máy): Đầu cao 30-45°, vệ sinh răng miệng bằng Chlorhexidine 0.12% mỗi 6-8h, hút đờm kín, xả nước ngưng dây thở." },
      { id: "bundle_cauti", text: "Dự phòng CAUTI (Nhiễm khuẩn tiết niệu): Chỉ đặt sonde khi có chỉ định y khoa, dùng kỹ thuật vô khuẩn tuyệt đối khi đặt, duy trì hệ thống nước tiểu kín và thấp hơn bàng quang." },
      { id: "bundle_ssi", text: "Dự phòng SSI (Nhiễm khuẩn vết mổ): Bệnh nhân tắm bằng xà phòng sát khuẩn trước mổ, sát trùng da vùng mổ đúng kỹ thuật, kháng sinh dự phòng trước rạch da 60 phút, duy trì thân nhiệt." }
    ]
  }
};

// --- 3. GLOBAL STATE ---
let clinicalData = {}; // { checklistId: { itemId: { checked, completed_at, performer } } }
let ksnkData = {};     // { checklistId: { itemId: { checked, completed_at, performer } } }
let currentClinicalId = "phong_mo";
let lastPerformerName = "";
let currentUser = null; // Decrypted User session
let authToken = null;

// --- 4. DOM ELEMENTS ---
// Tab Buttons
const tabBtnChecklist = document.getElementById("tab-btn-checklist");
const tabBtnKsnk = document.getElementById("tab-btn-ksnk");
const tabBtnCalculator = document.getElementById("tab-btn-calculator");

// Tab Section Containers
const sectionChecklist = document.getElementById("section-checklist");
const sectionKsnk = document.getElementById("section-ksnk");
const sectionCalculator = document.getElementById("section-calculator");

// Auth Controls
const authHeaderContainer = document.getElementById("auth-header-container");
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");
const loginErrorMsg = document.getElementById("login-error-msg");
const btnLoginClose = document.getElementById("btn-login-close");
const btnLoginTrigger = document.getElementById("btn-login-trigger");

// Clinical Checklist UI
const checklistSelectorContainer = document.getElementById("checklist-selector-container");
const currentChecklistTitle = document.getElementById("current-checklist-title");
const currentChecklistDesc = document.getElementById("current-checklist-desc");
const checklistItemsContainer = document.getElementById("checklist-items-container");
const checklistProgressText = document.getElementById("checklist-progress-text");
const checklistProgressBar = document.getElementById("checklist-progress-bar");
const btnResetChecklist = document.getElementById("btn-reset-checklist");
const btnExportCsv = document.getElementById("btn-export-csv");
const btnExportPdf = document.getElementById("btn-export-pdf");

// KSNK Checklist UI
const ksnkAccordionsContainer = document.getElementById("ksnk-accordions-container");
const btnResetKsnk = document.getElementById("btn-reset-ksnk");
const btnExportKsnkCsv = document.getElementById("btn-export-ksnk-csv");
const btnExportKsnkPdf = document.getElementById("btn-export-ksnk-pdf");

// Calculator UI
const scoreSelect = document.getElementById("score-select");
const calculatorForm = document.getElementById("calculator-form");
const calculatorInputsContainer = document.getElementById("calculator-inputs-container");
const calculatorResultPanel = document.getElementById("calculator-result-panel");
const resultScoreCircle = document.getElementById("result-score-circle");
const resultScoreValue = document.getElementById("result-score-value");
const resultRiskBadge = document.getElementById("result-risk-badge");
const resultRiskLevel = document.getElementById("result-risk-level");
const resultRecommendation = document.getElementById("result-recommendation");
const historyListContainer = document.getElementById("history-list-container");
const btnExportHistoryCsv = document.getElementById("btn-export-history-csv");

// --- 5. APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", async () => {
  setupAuthSession();
  setupTabEvents();
  setupAuthEvents();
  setupClinicalEvents();
  setupKsnkEvents();
  setupCalculatorEvents();

  // Load backend data
  await fetchLastPerformerName();
  await fetchClinicalProgress();
  await fetchKsnkProgress();
  await fetchHistory();

  // Draw Initial Views
  renderClinicalChecklist(currentClinicalId);
  renderKsnkChecklists();
  renderCalculatorInputs(scoreSelect.value);

  // Set timestamps for printing
  document.querySelectorAll(".current-time-string").forEach(el => {
    el.textContent = new Date().toLocaleString("vi-VN");
  });
});

// --- 6. AUTHENTICATION LOGIC ---

function setupAuthSession() {
  authToken = localStorage.getItem("clinical_token");
  const storedUser = localStorage.getItem("clinical_user");
  if (authToken && storedUser) {
    currentUser = JSON.parse(storedUser);
    lastPerformerName = currentUser.fullname; // Auto fill performer as fullname
  } else {
    currentUser = null;
    authToken = null;
  }
  updateAuthUI();
}

function updateAuthUI() {
  if (currentUser) {
    // Logged in
    const isAdmin = currentUser.role === 'admin';
    authHeaderContainer.innerHTML = `
      <div class="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-sm text-xxs sm:text-xs">
        <div class="flex items-center gap-2">
          <div class="h-6 w-6 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center font-bold">
            ${currentUser.fullname.charAt(0)}
          </div>
          <div>
            <span class="font-bold text-slate-700 block">${currentUser.fullname}</span>
            <span class="text-slate-400 font-semibold text-[9px] uppercase tracking-wider">${currentUser.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}</span>
          </div>
        </div>
        ${isAdmin ? `
          <a href="admin.html" class="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xxs font-bold transition-all border border-indigo-200 flex items-center gap-1">
            <i class="fa-solid fa-chart-line"></i>
            <span>Quản trị</span>
          </a>
        ` : ''}
        <button id="btn-logout" class="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg text-xxs font-bold transition-all flex items-center gap-1">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Đăng xuất</span>
        </button>
      </div>
    `;

    document.getElementById("btn-logout").addEventListener("click", () => {
      logoutUser();
    });
  } else {
    // Guest mode
    authHeaderContainer.innerHTML = `
      <button id="btn-login-trigger" class="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
        <i class="fa-solid fa-user-md"></i>
        <span>Đăng nhập</span>
      </button>
    `;
    
    document.getElementById("btn-login-trigger").addEventListener("click", () => {
      showLoginModal(true);
    });
  }
}

function showLoginModal(show) {
  if (show) {
    loginModal.classList.remove("hidden");
    setTimeout(() => {
      loginModal.classList.remove("opacity-0");
      loginModal.querySelector("div").classList.remove("scale-95");
    }, 10);
  } else {
    loginModal.classList.add("opacity-0");
    loginModal.querySelector("div").classList.add("scale-95");
    setTimeout(() => {
      loginModal.classList.add("hidden");
      loginErrorMsg.classList.add("hidden");
      loginForm.reset();
    }, 300);
  }
}

function setupAuthEvents() {
  btnLoginClose.addEventListener("click", () => showLoginModal(false));
  
  // Close modal clicking backdrop
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) showLoginModal(false);
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        loginErrorMsg.textContent = data.error || "Sai thông tin đăng nhập";
        loginErrorMsg.classList.remove("hidden");
        return;
      }

      // Success
      localStorage.setItem("clinical_token", data.token);
      localStorage.setItem("clinical_user", JSON.stringify(data.user));
      
      setupAuthSession();
      showLoginModal(false);

      // Re-fetch data
      await fetchLastPerformerName();
      await fetchClinicalProgress();
      await fetchKsnkProgress();

      // Refresh view
      renderClinicalChecklist(currentClinicalId);
      renderKsnkChecklists();
      
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      loginErrorMsg.textContent = "Không thể kết nối đến máy chủ!";
      loginErrorMsg.classList.remove("hidden");
    }
  });
}

function logoutUser() {
  localStorage.removeItem("clinical_token");
  localStorage.removeItem("clinical_user");
  setupAuthSession();
  
  // Clear local checklist performer names if any and reload progress
  fetchLastPerformerName();
  fetchClinicalProgress().then(() => renderClinicalChecklist(currentClinicalId));
  fetchKsnkProgress().then(() => renderKsnkChecklists());
}

// Check auth before action
function checkAuthBeforeAction() {
  if (!currentUser) {
    showLoginModal(true);
    return false;
  }
  return true;
}

// --- 7. TAB NAVIGATION LOGIC ---

function setupTabEvents() {
  tabBtnChecklist.addEventListener("click", () => {
    setActiveTab(tabBtnChecklist, sectionChecklist);
  });
  tabBtnKsnk.addEventListener("click", () => {
    setActiveTab(tabBtnKsnk, sectionKsnk);
  });
  tabBtnCalculator.addEventListener("click", () => {
    setActiveTab(tabBtnCalculator, sectionCalculator);
    fetchHistory();
  });
}

function setActiveTab(activeBtn, activeSection) {
  // Buttons
  tabBtnChecklist.classList.remove("active");
  tabBtnKsnk.classList.remove("active");
  tabBtnCalculator.classList.remove("active");
  activeBtn.classList.add("active");

  // Sections
  sectionChecklist.classList.add("hidden");
  sectionKsnk.classList.add("hidden");
  sectionCalculator.classList.add("hidden");
  activeSection.classList.remove("hidden");
}

// --- 8. CLINICAL CHECKLIST (TAB 1) ---

async function fetchLastPerformerName() {
  try {
    const res = await fetch("/api/checklists/last-performer");
    const data = await res.json();
    if (data.performer) {
      lastPerformerName = data.performer;
    }
  } catch (error) {
    console.error("Error fetching last performer name:", error);
  }
}

async function fetchClinicalProgress() {
  try {
    const res = await fetch("/api/checklists");
    const data = await res.json();
    clinicalData = { phong_mo: {}, sbar: {}, truoc_phau_thuat: {} };
    data.forEach(row => {
      const { checklist_id, item_id, checked, completed_at, performer } = row;
      if (clinicalData[checklist_id]) {
        clinicalData[checklist_id][item_id] = { checked, completed_at, performer };
      }
    });
  } catch (error) {
    console.error("Lỗi lấy dữ liệu checklist lâm sàng:", error);
  }
}

function setupClinicalEvents() {
  // Checklist selector switching
  checklistSelectorContainer.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      checklistSelectorContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      const target = e.currentTarget;
      target.classList.add("active");
      currentClinicalId = target.dataset.checklist;
      renderClinicalChecklist(currentClinicalId);
    });
  });

  // Reset checklist
  btnResetChecklist.addEventListener("click", async () => {
    if (!checkAuthBeforeAction()) return;
    
    const title = CLINICAL_TEMPLATES[currentClinicalId].title;
    if (confirm(`Bạn có chắc chắn muốn reset toàn bộ bảng kiểm lâm sàng "${title}"?`)) {
      try {
        const res = await fetch("/api/checklists/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checklistId: currentClinicalId })
        });
        if (res.ok) {
          clinicalData[currentClinicalId] = {};
          renderClinicalChecklist(currentClinicalId);
        }
      } catch (error) {
        console.error("Error resetting checklist:", error);
      }
    }
  });

  // Export CSV
  btnExportCsv.addEventListener("click", () => {
    exportClinicalCSV();
  });

  // Export PDF / Print
  btnExportPdf.addEventListener("click", () => {
    document.querySelectorAll(".current-time-string").forEach(el => {
      el.textContent = new Date().toLocaleString("vi-VN");
    });
    window.print();
  });
}

function renderClinicalChecklist(checklistId) {
  const template = CLINICAL_TEMPLATES[checklistId];
  if (!template) return;

  currentChecklistTitle.textContent = template.title;
  currentChecklistDesc.textContent = template.description;
  checklistItemsContainer.innerHTML = "";

  const saved = clinicalData[checklistId] || {};
  let totalCount = 0;
  let checkedCount = 0;

  template.sections.forEach(section => {
    // Section Header
    const sHeader = document.createElement("div");
    sHeader.className = "mt-4 border-b border-slate-100 pb-2";
    sHeader.innerHTML = `<h3 class="checklist-section-title text-xs font-bold text-slate-800 tracking-wide uppercase">${section.name}</h3>`;
    checklistItemsContainer.appendChild(sHeader);

    // Section Items
    section.items.forEach(item => {
      totalCount++;
      const isChecked = saved[item.id] ? saved[item.id].checked : false;
      const completedAt = saved[item.id] ? saved[item.id].completed_at : null;
      const performer = saved[item.id] ? saved[item.id].performer : "";

      if (isChecked) checkedCount++;

      // Format timestamp for display
      let timeText = "";
      if (completedAt) {
        const dateObj = new Date(completedAt);
        const pad = (n) => n.toString().padStart(2, '0');
        timeText = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())} ${pad(dateObj.getDate())}/${pad(dateObj.getMonth() + 1)}`;
      }

      const row = document.createElement("div");
      row.className = `checklist-row flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-100 bg-white gap-3 ${isChecked ? "checked-row shadow-sm" : ""}`;
      row.id = `clinical-row-${item.id}`;

      row.innerHTML = `
        <div class="flex items-start gap-3 flex-grow">
          <div class="custom-checkbox mt-0.5 ${isChecked ? "checked" : ""}" data-item-id="${item.id}">
            <i class="fa-solid fa-check text-xs"></i>
          </div>
          <div class="text-xs font-semibold text-slate-700 leading-relaxed cursor-pointer select-none item-text flex-grow">
            ${item.text}
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 justify-end text-xs no-print">
          <span class="timestamp-badge bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-mono text-[10px] ${isChecked ? "" : "hidden"}">
            <i class="fa-solid fa-clock mr-1"></i>${timeText}
          </span>
          <div class="performer-container flex items-center gap-1.5 ${isChecked ? "" : "hidden"}">
            <label class="text-slate-400 font-semibold text-[10px]">Người làm:</label>
            <input type="text" 
                   value="${performer}" 
                   placeholder="Nhập tên..." 
                   class="performer-input w-28 text-slate-700 font-bold text-xxs py-0.5 px-1 border-b-2 border-slate-200 focus:outline-none"
                   data-item-id="${item.id}">
          </div>
        </div>
        <!-- Print preview -->
        <div class="print-only text-xxs text-slate-500 mt-1 flex justify-between gap-6 border-t border-slate-100 pt-1">
          <span>Thời gian: ${timeText || '__________'}</span>
          <span>Người thực hiện: ${performer || '__________'}</span>
        </div>
      `;

      // Event handlers
      const checkBtn = row.querySelector(".custom-checkbox");
      const textBtn = row.querySelector(".item-text");
      
      const clickHandler = () => {
        if (!checkAuthBeforeAction()) return;
        toggleClinicalItem(checklistId, item.id);
      };
      
      checkBtn.addEventListener("click", clickHandler);
      textBtn.addEventListener("click", clickHandler);

      const performerInput = row.querySelector(".performer-input");
      performerInput.addEventListener("change", (e) => {
        saveClinicalPerformer(checklistId, item.id, e.target.value);
      });

      checklistItemsContainer.appendChild(row);
    });
  });

  // Update clinical progress widget
  const percent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  checklistProgressText.textContent = `${checkedCount}/${totalCount} mục (${percent}%)`;
  checklistProgressBar.style.width = `${percent}%`;
}

async function toggleClinicalItem(checklistId, itemId) {
  const isChecked = clinicalData[checklistId][itemId] ? clinicalData[checklistId][itemId].checked : false;
  const newChecked = !isChecked;
  const nowISO = new Date().toISOString();
  
  // Set default performer to current logged in user full name
  const performer = newChecked ? (currentUser.fullname || lastPerformerName || "") : "";

  // Update local
  if (!clinicalData[checklistId]) clinicalData[checklistId] = {};
  clinicalData[checklistId][itemId] = {
    checked: newChecked,
    completed_at: newChecked ? nowISO : null,
    performer: performer
  };

  renderClinicalChecklist(checklistId);

  // Sync DB
  try {
    const res = await fetch("/api/checklists/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checklistId,
        itemId,
        checked: newChecked,
        performer,
        completedAt: newChecked ? nowISO : null
      })
    });
    if (!res.ok) throw new Error();
  } catch (error) {
    console.error("Lỗi cập nhật tiến độ lâm sàng:", error);
  }
}

async function saveClinicalPerformer(checklistId, itemId, value) {
  const name = value.trim();
  if (clinicalData[checklistId] && clinicalData[checklistId][itemId]) {
    clinicalData[checklistId][itemId].performer = name;
  }
  
  // Update other empty ones
  checklistItemsContainer.querySelectorAll(".performer-input").forEach(input => {
    if (input.value === "" && clinicalData[checklistId][input.dataset.itemId]?.checked) {
      input.value = name;
      clinicalData[checklistId][input.dataset.itemId].performer = name;
      syncClinicalPerformer(checklistId, input.dataset.itemId, name);
    }
  });

  await syncClinicalPerformer(checklistId, itemId, name);
}

async function syncClinicalPerformer(checklistId, itemId, name) {
  const item = clinicalData[checklistId][itemId];
  if (!item) return;
  try {
    await fetch("/api/checklists/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checklistId,
        itemId,
        checked: item.checked,
        performer: name,
        completedAt: item.completed_at
      })
    });
  } catch (error) {
    console.error("Lỗi đồng bộ người thực hiện lâm sàng:", error);
  }
}

function exportClinicalCSV() {
  let csv = "\ufeff";
  csv += "Tên Bảng Kiểm Lâm Sàng,Nhóm Bảng Kiểm,Nội Dung,Trạng Thái,Thời Gian,Người Thực Hiện\n";
  
  Object.keys(CLINICAL_TEMPLATES).forEach(cid => {
    const template = CLINICAL_TEMPLATES[cid];
    const saved = clinicalData[cid] || {};
    
    template.sections.forEach(sec => {
      sec.items.forEach(item => {
        const state = saved[item.id] || { checked: false, completed_at: null, performer: "" };
        const status = state.checked ? "Đã làm" : "Chưa làm";
        let dateText = "";
        if (state.completed_at) {
          const dateObj = new Date(state.completed_at);
          dateText = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')} ${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
        }
        
        csv += `"${template.title}","${sec.name.replace(/"/g, '""')}","${item.text.replace(/"/g, '""')}","${status}","${dateText}","${state.performer || ''}"\n`;
      });
    });
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Bao_Cao_Checklist_Lam_Sang_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// --- 9. INFECTION CONTROL (KSNK - TAB 2) LOGIC (NEW) ---

async function fetchKsnkProgress() {
  try {
    const res = await fetch("/api/ksnk");
    const data = await res.json();
    ksnkData = {
      ve_sinh_tay: {},
      ppe_cach_ly: {},
      moi_truong: {},
      khu_khuan: {},
      goi_can_thiep: {}
    };
    data.forEach(row => {
      const { checklist_id, item_id, checked, completed_at, performer } = row;
      if (ksnkData[checklist_id]) {
        ksnkData[checklist_id][item_id] = { checked, completed_at, performer };
      }
    });
  } catch (error) {
    console.error("Lỗi lấy dữ liệu tiến độ KSNK:", error);
  }
}

function setupKsnkEvents() {
  // Reset KSNK
  btnResetKsnk.addEventListener("click", async () => {
    if (!checkAuthBeforeAction()) return;
    
    // Find currently expanded accordion checklistId
    let activeKsnkId = null;
    document.querySelectorAll(".ksnk-accordion-content").forEach(content => {
      if (content.classList.contains("expanded")) {
        activeKsnkId = content.dataset.ksnkId;
      }
    });

    if (!activeKsnkId) {
      alert("Vui lòng mở rộng (Click vào tiêu đề) một bảng kiểm KSNK cần reset!");
      return;
    }

    const title = KSNK_TEMPLATES[activeKsnkId].title;
    if (confirm(`Bạn có chắc muốn reset toàn bộ bảng kiểm KSNK "${title}"?`)) {
      try {
        const res = await fetch("/api/ksnk/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checklistId: activeKsnkId })
        });
        if (res.ok) {
          ksnkData[activeKsnkId] = {};
          renderKsnkChecklists();
        }
      } catch (error) {
        console.error("Error resetting KSNK checklist:", error);
      }
    }
  });

  // Export CSV
  btnExportKsnkCsv.addEventListener("click", () => {
    exportKsnkCSV();
  });

  // Export PDF
  btnExportKsnkPdf.addEventListener("click", () => {
    // Expand all KSNK accordions so they are visible during window.print()
    document.querySelectorAll(".ksnk-accordion-content").forEach(content => {
      content.classList.add("expanded");
      const icon = content.previousElementSibling.querySelector(".accordion-icon");
      if (icon) icon.classList.add("rotate-180");
    });
    
    document.querySelectorAll(".current-time-string").forEach(el => {
      el.textContent = new Date().toLocaleString("vi-VN");
    });
    
    window.print();
  });
}

function renderKsnkChecklists() {
  ksnkAccordionsContainer.innerHTML = "";

  Object.keys(KSNK_TEMPLATES).forEach(kid => {
    const template = KSNK_TEMPLATES[kid];
    const saved = ksnkData[kid] || {};
    
    let totalItems = template.items.length;
    let checkedItems = 0;
    
    template.items.forEach(item => {
      if (saved[item.id] && saved[item.id].checked) {
        checkedItems++;
      }
    });

    const percent = Math.round((checkedItems / totalItems) * 100);

    const accordion = document.createElement("div");
    accordion.className = "bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm";
    
    accordion.innerHTML = `
      <!-- Accordion Header -->
      <div class="ksnk-accordion-header flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100 transition-all select-none">
        <div class="flex-grow">
          <h3 class="text-xs sm:text-sm font-extrabold text-indigo-950 uppercase tracking-tight">${template.title}</h3>
          <p class="text-xxs text-slate-400 mt-0.5">${template.description}</p>
        </div>
        <div class="flex items-center gap-4 no-print">
          <!-- Tiến độ nhỏ -->
          <div class="flex flex-col items-end gap-1">
            <span class="text-xxs font-bold text-slate-500">${checkedItems}/${totalItems} (${percent}%)</span>
            <div class="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div class="bg-indigo-600 h-1.5 transition-all duration-300" style="width: ${percent}%"></div>
            </div>
          </div>
          <i class="fa-solid fa-chevron-down text-slate-400 text-xs transition-all duration-200 accordion-icon"></i>
        </div>
      </div>
      
      <!-- Accordion Content -->
      <div class="ksnk-accordion-content flex flex-col gap-4 p-4 border-t border-slate-100" data-ksnk-id="${kid}">
        <div class="flex flex-col gap-3.5" id="ksnk-items-list-${kid}">
          <!-- Chèn danh sách items -->
        </div>
      </div>
    `;

    // Toggle expansion logic
    const header = accordion.querySelector(".ksnk-accordion-header");
    const content = accordion.querySelector(".ksnk-accordion-content");
    const icon = accordion.querySelector(".accordion-icon");

    header.addEventListener("click", () => {
      const isExpanded = content.classList.contains("expanded");
      
      // Close other accordions first (optional, but clean. Let's keep them independent for easy multi-check)
      content.classList.toggle("expanded");
      icon.classList.toggle("rotate-180");
    });

    // Populate items
    const listContainer = accordion.querySelector(`#ksnk-items-list-${kid}`);
    template.items.forEach(item => {
      const isChecked = saved[item.id] ? saved[item.id].checked : false;
      const completedAt = saved[item.id] ? saved[item.id].completed_at : null;
      const performer = saved[item.id] ? saved[item.id].performer : "";

      let timeText = "";
      if (completedAt) {
        const dateObj = new Date(completedAt);
        const pad = (n) => n.toString().padStart(2, '0');
        timeText = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())} ${pad(dateObj.getDate())}/${pad(dateObj.getMonth() + 1)}`;
      }

      const itemRow = document.createElement("div");
      itemRow.className = `checklist-row flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-100 bg-white gap-3 ${isChecked ? "checked-row shadow-sm" : ""}`;
      
      itemRow.innerHTML = `
        <div class="flex items-start gap-3 flex-grow">
          <div class="custom-checkbox ksnk-checkbox mt-0.5 ${isChecked ? "checked" : ""}" data-item-id="${item.id}">
            <i class="fa-solid fa-check text-xs"></i>
          </div>
          <div class="text-xs font-semibold text-slate-700 leading-relaxed cursor-pointer select-none item-text flex-grow">
            ${item.text}
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 justify-end text-xs no-print">
          <span class="timestamp-badge bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-md font-mono text-[10px] ${isChecked ? "" : "hidden"}">
            <i class="fa-solid fa-clock mr-1"></i>${timeText}
          </span>
          <div class="performer-container flex items-center gap-1.5 ${isChecked ? "" : "hidden"}">
            <label class="text-slate-400 font-semibold text-[10px]">Cán bộ:</label>
            <input type="text" 
                   value="${performer}" 
                   placeholder="Tên..." 
                   class="performer-input w-28 text-slate-700 font-bold text-xxs py-0.5 px-1 border-b-2 border-slate-200 focus:outline-none"
                   data-item-id="${item.id}">
          </div>
        </div>
        <!-- Print preview -->
        <div class="print-only text-xxs text-slate-500 mt-1 flex justify-between gap-6 border-t border-slate-100 pt-1">
          <span>Thời gian: ${timeText || '__________'}</span>
          <span>Người thực hiện: ${performer || '__________'}</span>
        </div>
      `;

      // Tick Event Handlers
      const checkBtn = itemRow.querySelector(".custom-checkbox");
      const textBtn = itemRow.querySelector(".item-text");

      const clickHandler = () => {
        if (!checkAuthBeforeAction()) return;
        toggleKsnkItem(kid, item.id);
      };
      checkBtn.addEventListener("click", clickHandler);
      textBtn.addEventListener("click", clickHandler);

      // Performer Input
      const performerInput = itemRow.querySelector(".performer-input");
      performerInput.addEventListener("change", (e) => {
        saveKsnkPerformer(kid, item.id, e.target.value);
      });

      listContainer.appendChild(itemRow);
    });

    ksnkAccordionsContainer.appendChild(accordion);
  });
}

async function toggleKsnkItem(checklistId, itemId) {
  const isChecked = ksnkData[checklistId][itemId] ? ksnkData[checklistId][itemId].checked : false;
  const newChecked = !isChecked;
  const nowISO = new Date().toISOString();
  
  const performer = newChecked ? (currentUser.fullname || lastPerformerName || "") : "";

  if (!ksnkData[checklistId]) ksnkData[checklistId] = {};
  ksnkData[checklistId][itemId] = {
    checked: newChecked,
    completed_at: newChecked ? nowISO : null,
    performer: performer
  };

  renderKsnkChecklists();

  try {
    await fetch("/api/ksnk/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checklistId,
        itemId,
        checked: newChecked,
        performer,
        completedAt: newChecked ? nowISO : null
      })
    });
  } catch (error) {
    console.error("Lỗi cập nhật tiến độ KSNK:", error);
  }
}

async function saveKsnkPerformer(checklistId, itemId, value) {
  const name = value.trim();
  if (ksnkData[checklistId] && ksnkData[checklistId][itemId]) {
    ksnkData[checklistId][itemId].performer = name;
  }

  // Update empty ones inside this checklist
  document.getElementById(`ksnk-items-list-${checklistId}`).querySelectorAll(".performer-input").forEach(input => {
    if (input.value === "" && ksnkData[checklistId][input.dataset.itemId]?.checked) {
      input.value = name;
      ksnkData[checklistId][input.dataset.itemId].performer = name;
      syncKsnkPerformer(checklistId, input.dataset.itemId, name);
    }
  });

  await syncKsnkPerformer(checklistId, itemId, name);
}

async function syncKsnkPerformer(checklistId, itemId, name) {
  const item = ksnkData[checklistId][itemId];
  if (!item) return;
  try {
    await fetch("/api/ksnk/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checklistId,
        itemId,
        checked: item.checked,
        performer: name,
        completedAt: item.completed_at
      })
    });
  } catch (error) {
    console.error("Lỗi đồng bộ cán bộ KSNK:", error);
  }
}

function exportKsnkCSV() {
  let csv = "\ufeff";
  csv += "Bảng Kiểm KSNK,Nội Dung Chỉ Tiêu,Trạng Thái Đạt,Thời Gian Giám Sát,Cán Bộ Kiểm Tra\n";

  Object.keys(KSNK_TEMPLATES).forEach(kid => {
    const template = KSNK_TEMPLATES[kid];
    const saved = ksnkData[kid] || {};

    template.items.forEach(item => {
      const state = saved[item.id] || { checked: false, completed_at: null, performer: "" };
      const status = state.checked ? "Đạt tiêu chuẩn" : "Chưa đạt";
      let dateText = "";
      if (state.completed_at) {
        const dateObj = new Date(state.completed_at);
        dateText = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')} ${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
      }

      csv += `"${template.title}","${item.text.replace(/"/g, '""')}","${status}","${dateText}","${state.performer || ''}"\n`;
    });
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Bao_Cao_KSNK_Noi_Vien_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// --- 10. RISK CALCULATORS LOGIC (UPGRADED) ---

function setupCalculatorEvents() {
  scoreSelect.addEventListener("change", (e) => {
    renderCalculatorInputs(e.target.value);
    calculatorResultPanel.classList.add("hidden");
  });

  calculatorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateScore();
  });

  btnExportHistoryCsv.addEventListener("click", () => {
    exportCalculatorsHistoryCSV();
  });
}

function renderCalculatorInputs(scoreId) {
  calculatorInputsContainer.innerHTML = "";

  if (scoreId === "cha2ds2_vasc") {
    calculatorInputsContainer.innerHTML = `
      <div class="col-span-1 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <label class="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-2">Độ tuổi bệnh nhân</label>
        <div class="grid grid-cols-3 gap-2">
          <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer text-xs font-semibold hover:bg-sky-50/50">
            <input type="radio" name="age" value="0" checked class="text-sky-600 focus:ring-sky-500">
            <span>&lt; 65 tuổi (0đ)</span>
          </label>
          <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer text-xs font-semibold hover:bg-sky-50/50">
            <input type="radio" name="age" value="1" class="text-sky-600 focus:ring-sky-500">
            <span>65-74 tuổi (1đ)</span>
          </label>
          <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer text-xs font-semibold hover:bg-sky-50/50">
            <input type="radio" name="age" value="2" class="text-sky-600 focus:ring-sky-500">
            <span>&ge; 75 tuổi (2đ)</span>
          </label>
        </div>
      </div>
      <div class="col-span-1 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <label class="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-2">Giới tính sinh học</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer text-xs font-semibold hover:bg-sky-50/50">
            <input type="radio" name="sex" value="male" checked class="text-sky-600 focus:ring-sky-500">
            <span>Nam (0đ)</span>
          </label>
          <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer text-xs font-semibold hover:bg-sky-50/50">
            <input type="radio" name="sex" value="female" class="text-sky-600 focus:ring-sky-500">
            <span>Nữ (+1đ)</span>
          </label>
        </div>
      </div>
      <div class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="chf" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Suy tim sung huyết/RLCN thất trái</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="htn" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tăng huyết áp</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="dm" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Đái tháo đường</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="stroke" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tiền sử đột quỵ / TIA / Thuyên tắc</p>
            <p class="text-slate-400 text-[9px]">(+2 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50 md:col-span-2">
          <input type="checkbox" name="vascular" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Bệnh động mạch ngoại biên, NMCT cũ, hoặc xơ vữa ĐMC</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
      </div>
    `;
  }
  else if (scoreId === "has_bled") {
    calculatorInputsContainer.innerHTML = `
      <div class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="htn" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">HA tâm thu > 160 mmHg</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="renal" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Rối loạn chức năng thận</p>
            <p class="text-slate-400 text-[9px]">Lọc máu, ghép thận hoặc Creatinine > 200 umol/L (+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="liver" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Rối loạn chức năng gan</p>
            <p class="text-slate-400 text-[9px]">Xơ gan, Bilirubin > 2 lần hoặc Men gan > 3 lần bình thường (+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="stroke" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tiền sử đột quỵ não</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="bleeding" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tiền sử xuất huyết nặng/cơ địa dễ xuất huyết</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="labile_inr" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">INR dao động nhiều (TTR < 60%)</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="elderly" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Người cao tuổi (> 65 tuổi)</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="antiplatelet" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Dùng thuốc kháng tiểu cầu / NSAIDs</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50 md:col-span-2">
          <input type="checkbox" name="alcohol" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Lạm dụng rượu/bia (&ge; 8 cốc/tuần)</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
      </div>
    `;
  }
  else if (scoreId === "spesi") {
    calculatorInputsContainer.innerHTML = `
      <div class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="age_80" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tuổi > 80</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="cancer" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tiền sử / bệnh ung thư đang tiến triển</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="cardiopulmonary" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Bệnh tim hoặc bệnh phổi mãn tính</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="tachycardia" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Nhịp tim &ge; 110 lần/phút</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="hypotension" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Huyết áp tâm thu < 100 mmHg</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="hypoxia" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">SpO2 < 90% khi thở khí trời</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
      </div>
    `;
  }
  else if (scoreId === "qsofa") {
    calculatorInputsContainer.innerHTML = `
      <div class="col-span-1 md:col-span-2 grid grid-cols-1 gap-3">
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="rr_22" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Nhịp thở &ge; 22 lần/phút</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="gcs_15" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Ý thức lơ mơ / Glasgow < 15</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="sbp_100" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Huyết áp tâm thu &le; 100 mmHg</p>
            <p class="text-slate-400 text-[9px]">(+1 đ)</p>
          </div>
        </label>
      </div>
    `;
  }
  else if (scoreId === "sofa") {
    calculatorInputsContainer.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Hô hấp (PaO2/FiO2 ratio)</label>
        <select name="resp" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">&ge; 400 (0 đ)</option>
          <option value="1">&lt; 400 (1 đ)</option>
          <option value="2">&lt; 300 (2 đ)</option>
          <option value="3">&lt; 200 kèm hỗ trợ thở máy (3 đ)</option>
          <option value="4">&lt; 100 kèm hỗ trợ thở máy (4 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Đông máu (Tiểu cầu x10^3/uL)</label>
        <select name="coag" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">&ge; 150 (0 đ)</option>
          <option value="1">100 - 149 (1 đ)</option>
          <option value="2">50 - 99 (2 đ)</option>
          <option value="3">20 - 49 (3 đ)</option>
          <option value="4">&lt; 20 (4 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Gan (Bilirubin mg/dL [umol/L])</label>
        <select name="liver" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">&lt; 1.2 [&lt; 20] (0 đ)</option>
          <option value="1">1.2 - 1.9 [20 - 32] (1 đ)</option>
          <option value="2">2.0 - 5.9 [33 - 101] (2 đ)</option>
          <option value="3">6.0 - 11.9 [102 - 204] (3 đ)</option>
          <option value="4">&ge; 12.0 [&ge; 204] (4 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Tim mạch (Huyết áp & Vận mạch)</label>
        <select name="cardio" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Không tụt huyết áp (MAP &ge; 70 mmHg) (0 đ)</option>
          <option value="1">MAP &lt; 70 mmHg (1 đ)</option>
          <option value="2">Dùng Dopamine &le; 5 hoặc Dobutamine bất kỳ liều nào (2 đ)</option>
          <option value="3">Dùng Dopamine > 5 hoặc Norepi/Epi &le; 0.1 ug/kg/min (3 đ)</option>
          <option value="4">Dùng Dopamine > 15 hoặc Norepi/Epi > 0.1 ug/kg/min (4 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Thần kinh (Điểm hôn mê GCS)</label>
        <select name="cns" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">15 - Tỉnh táo (0 đ)</option>
          <option value="1">13 - 14 (1 đ)</option>
          <option value="2">10 - 12 (2 đ)</option>
          <option value="3">6 - 9 (3 đ)</option>
          <option value="4">&lt; 6 - Hôn mê (4 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Thận (Creatinine hoặc Nước tiểu)</label>
        <select name="renal" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Creatinine &lt; 1.2 mg/dL (0 đ)</option>
          <option value="1">Creatinine 1.2 - 1.9 mg/dL (1 đ)</option>
          <option value="2">Creatinine 2.0 - 3.4 mg/dL (2 đ)</option>
          <option value="3">Creatinine 3.5 - 4.9 mg/dL hoặc Nước tiểu &lt; 500 mL/ngày (3 đ)</option>
          <option value="4">Creatinine &ge; 5.0 mg/dL hoặc Nước tiểu &lt; 200 mL/ngày (4 đ)</option>
        </select>
      </div>
    `;
  }
  else if (scoreId === "apgar") { // NEW
    calculatorInputsContainer.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Appearance (Màu da trẻ)</label>
        <select name="skin" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Xanh tím toàn thân hoặc nhợt nhạt (0 đ)</option>
          <option value="1">Thân hồng hào, các chi xanh tím (1 đ)</option>
          <option value="2">Hồng hào toàn thân (2 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Pulse (Nhịp tim)</label>
        <select name="pulse" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Không có nhịp tim (0 đ)</option>
          <option value="1">Chậm, dưới 100 lần/phút (1 đ)</option>
          <option value="2">Trên hoặc bằng 100 lần/phút (2 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Grimace (Phản xạ khi kích thích)</label>
        <select name="grimace" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Không phản ứng khi hút đờm/kích thích (0 đ)</option>
          <option value="1">Nhăn mặt, khóc yếu khi kích thích (1 đ)</option>
          <option value="2">Khóc to, hắt hơi, ho khi kích thích (2 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Activity (Trương lực cơ)</label>
        <select name="activity" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Nhão cơ hoàn toàn, không cử động (0 đ)</option>
          <option value="1">Gấp nhẹ các chi, cử động yếu (1 đ)</option>
          <option value="2">Cử động tích cực, co duỗi tốt (2 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 md:col-span-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Respiration (Nhịp thở/Khóc)</label>
        <select name="resp" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0">Không thở (0 đ)</option>
          <option value="1">Thở chậm, không đều, khóc yếu (1 đ)</option>
          <option value="2">Thở tốt, khóc to (2 đ)</option>
        </select>
      </div>
    `;
  }
  else if (scoreId === "curb65") { // NEW
    calculatorInputsContainer.innerHTML = `
      <div class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="confusion" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Confusion (Lú lẫn)</p>
            <p class="text-slate-400 text-[9px]">Mất định hướng thời gian, không gian, hoặc người xung quanh (+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="urea" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Urea > 7 mmol/L</p>
            <p class="text-slate-400 text-[9px]">Ure máu tăng cao trên ngưỡng 7 mmol/L (+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="rr" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Nhịp thở &ge; 30 lần/phút</p>
            <p class="text-slate-400 text-[9px]">Bệnh nhân thở nhanh, suy hô hấp (+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50">
          <input type="checkbox" name="bp" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Huyết áp tụt</p>
            <p class="text-slate-400 text-[9px]">HA tâm thu < 90 mmHg hoặc HA tâm trương &le; 60 mmHg (+1 đ)</p>
          </div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/50 md:col-span-2">
          <input type="checkbox" name="age65" class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4">
          <div class="text-xs">
            <p class="font-bold text-slate-700">Tuổi tác &ge; 65 tuổi</p>
            <p class="text-slate-400 text-[9px]">Bệnh nhân có tuổi đời từ 65 trở lên (+1 đ)</p>
          </div>
        </label>
      </div>
    `;
  }
  else if (scoreId === "mews") { // NEW
    calculatorInputsContainer.innerHTML = `
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Nhịp tim (Nhịp/phút)</label>
        <select name="hr" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="2">&le; 40 lần/phút (2 đ)</option>
          <option value="1">41 - 50 lần/phút (1 đ)</option>
          <option value="0" selected>51 - 100 lần/phút (0 đ)</option>
          <option value="1">101 - 110 lần/phút (1 đ)</option>
          <option value="2">111 - 129 lần/phút (2 đ)</option>
          <option value="3">&ge; 130 lần/phút (3 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Huyết áp tâm thu (mmHg)</label>
        <select name="sbp" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="3">&le; 70 mmHg (3 đ)</option>
          <option value="2">71 - 80 mmHg (2 đ)</option>
          <option value="1">81 - 100 mmHg (1 đ)</option>
          <option value="0" selected>101 - 199 mmHg (0 đ)</option>
          <option value="2">&ge; 200 mmHg (2 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Nhịp thở (Lần/phút)</label>
        <select name="rr" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="2">&lt; 9 lần/phút (2 đ)</option>
          <option value="0" selected>9 - 14 lần/phút (0 đ)</option>
          <option value="1">15 - 20 lần/phút (1 đ)</option>
          <option value="2">21 - 29 lần/phút (2 đ)</option>
          <option value="3">&ge; 30 lần/phút (3 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Nhiệt độ cơ thể (°C)</label>
        <select name="temp" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="2">&lt; 35.0 °C (2 đ)</option>
          <option value="0" selected>35.0 - 38.4 °C (0 đ)</option>
          <option value="2">&ge; 38.5 °C (2 đ)</option>
        </select>
      </div>
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 md:col-span-2">
        <label class="block text-xxs font-bold text-slate-400 uppercase">Tri giác (Thang AVPU)</label>
        <select name="avpu" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-sky-500 focus:outline-none">
          <option value="0" selected>A - Tỉnh táo hoàn toàn (0 đ)</option>
          <option value="1">V - Đáp ứng khi gọi/nói (1 đ)</option>
          <option value="2">P - Đáp ứng với kích thích đau (2 đ)</option>
          <option value="3">U - Hoàn toàn không phản ứng (3 đ)</option>
        </select>
      </div>
    `;
  }
}

async function calculateScore() {
  const scoreId = scoreSelect.value;
  const formData = new FormData(calculatorForm);
  
  let score = 0;
  let maxScore = 0;
  let scoreName = "";
  let parameters = {};
  let riskLevel = "";
  let recommendation = "";
  let riskClass = ""; // 'risk-low', 'risk-medium', 'risk-high'

  if (scoreId === "cha2ds2_vasc") {
    scoreName = "CHA2DS2-VASc";
    maxScore = 9;
    
    const ageVal = parseInt(formData.get("age") || "0");
    const sexVal = formData.get("sex") || "male";
    const chf = formData.has("chf");
    const htn = formData.has("htn");
    const dm = formData.has("dm");
    const stroke = formData.has("stroke");
    const vascular = formData.has("vascular");

    parameters = { age: ageVal === 0 ? "<65" : ageVal === 1 ? "65-74" : ">=75", sex: sexVal, chf, htn, dm, stroke, vascular };
    score += ageVal;
    if (chf) score += 1;
    if (htn) score += 1;
    if (dm) score += 1;
    if (stroke) score += 2;
    if (vascular) score += 1;
    if (sexVal === "female") score += 1;

    if (sexVal === "male") {
      if (score === 0) {
        riskLevel = "Nguy cơ thấp";
        riskClass = "risk-low";
        recommendation = "Không có chỉ định dùng kháng đông phòng đột quỵ (Class III).";
      } else if (score === 1) {
        riskLevel = "Nguy cơ trung bình";
        riskClass = "risk-medium";
        recommendation = "Nên cân nhắc dùng kháng đông đường uống (OAC, ưu tiên NOAC) (Class IIa).";
      } else {
        riskLevel = "Nguy cơ cao";
        riskClass = "risk-high";
        recommendation = "Chỉ định bắt buộc sử dụng kháng đông đường uống (OAC, ưu tiên NOAC) (Class I).";
      }
    } else { // female
      if (score === 1) {
        riskLevel = "Nguy cơ thấp";
        riskClass = "risk-low";
        recommendation = "Không chỉ định dùng kháng đông đơn thuần do yếu tố giới tính nữ (Class III).";
      } else if (score === 2) {
        riskLevel = "Nguy cơ trung bình";
        riskClass = "risk-medium";
        recommendation = "Nên cân nhắc dùng kháng đông đường uống (OAC, ưu tiên NOAC) (Class IIa).";
      } else {
        riskLevel = "Nguy cơ cao";
        riskClass = "risk-high";
        recommendation = "Chỉ định bắt buộc sử dụng kháng đông đường uống (OAC, ưu tiên NOAC) (Class I).";
      }
    }
  }
  else if (scoreId === "has_bled") {
    scoreName = "HAS-BLED";
    maxScore = 9;

    const htn = formData.has("htn");
    const renal = formData.has("renal");
    const liver = formData.has("liver");
    const stroke = formData.has("stroke");
    const bleeding = formData.has("bleeding");
    const labile_inr = formData.has("labile_inr");
    const elderly = formData.has("elderly");
    const antiplatelet = formData.has("antiplatelet");
    const alcohol = formData.has("alcohol");

    parameters = { htn, renal, liver, stroke, bleeding, labile_inr, elderly, antiplatelet, alcohol };
    if (htn) score += 1;
    if (renal) score += 1;
    if (liver) score += 1;
    if (stroke) score += 1;
    if (bleeding) score += 1;
    if (labile_inr) score += 1;
    if (elderly) score += 1;
    if (antiplatelet) score += 1;
    if (alcohol) score += 1;

    if (score <= 2) {
      riskLevel = "Nguy cơ chảy máu thấp/vừa";
      riskClass = "risk-low";
      recommendation = "Theo dõi lâm sàng định kỳ. Đảm bảo tuân thủ liều lượng kháng đông.";
    } else {
      riskLevel = "Nguy cơ chảy máu cao (&ge; 3 điểm)";
      riskClass = "risk-high";
      recommendation = "Tăng cường theo dõi sát. Hiệu chỉnh các yếu tố nguy cơ có thể thay đổi được (kiểm soát huyết áp chặt chẽ, dừng dùng phối hợp Aspirin/NSAIDs không cần thiết, hạn chế tối đa cồn). Không dừng kháng đông tự ý.";
    }
  }
  else if (scoreId === "spesi") {
    scoreName = "sPESI";
    maxScore = 6;

    const age_80 = formData.has("age_80");
    const cancer = formData.has("cancer");
    const cardiopulmonary = formData.has("cardiopulmonary");
    const tachycardia = formData.has("tachycardia");
    const hypotension = formData.has("hypotension");
    const hypoxia = formData.has("hypoxia");

    parameters = { age_80, cancer, cardiopulmonary, tachycardia, hypotension, hypoxia };
    if (age_80) score += 1;
    if (cancer) score += 1;
    if (cardiopulmonary) score += 1;
    if (tachycardia) score += 1;
    if (hypotension) score += 1;
    if (hypoxia) score += 1;

    if (score === 0) {
      riskLevel = "Nguy cơ thấp (Tử vong 30 ngày ~1.1%)";
      riskClass = "risk-low";
      recommendation = "Cân nhắc điều trị ngoại trú sớm tại nhà nếu điều kiện lâm sàng và gia đình cho phép.";
    } else {
      riskLevel = "Nguy cơ cao (Tử vong 30 ngày ~8.9%)";
      riskClass = "risk-high";
      recommendation = "Bắt buộc nhập viện nội trú, theo dõi sát huyết động và siêu âm tim đánh giá chức năng thất phải.";
    }
  }
  else if (scoreId === "qsofa") {
    scoreName = "qSOFA";
    maxScore = 3;

    const rr_22 = formData.has("rr_22");
    const gcs_15 = formData.has("gcs_15");
    const sbp_100 = formData.has("sbp_100");

    parameters = { rr_22, gcs_15, sbp_100 };
    if (rr_22) score += 1;
    if (gcs_15) score += 1;
    if (sbp_100) score += 1;

    if (score < 2) {
      riskLevel = "Nguy cơ thấp";
      riskClass = "risk-low";
      recommendation = "Tiếp tục theo dõi lâm sàng thông thường. Đánh giá lại qSOFA nếu bệnh diễn tiến nặng hơn.";
    } else {
      riskLevel = "Nguy cơ cao suy sụp lâm sàng";
      riskClass = "risk-high";
      recommendation = "Khẩn cấp đánh giá suy tạng (SOFA đầy đủ), cấy máu, dùng kháng sinh phổ rộng sớm và cân nhắc hồi sức tích cực.";
    }
  }
  else if (scoreId === "sofa") {
    scoreName = "SOFA";
    maxScore = 24;

    const resp = parseInt(formData.get("resp") || "0");
    const coag = parseInt(formData.get("coag") || "0");
    const liver = parseInt(formData.get("liver") || "0");
    const cardio = parseInt(formData.get("cardio") || "0");
    const cns = parseInt(formData.get("cns") || "0");
    const renal = parseInt(formData.get("renal") || "0");

    parameters = { resp, coag, liver, cardio, cns, renal };
    score = resp + coag + liver + cardio + cns + renal;

    if (score < 2) {
      riskLevel = `Suy tạng nhẹ (Tổng điểm: ${score})`;
      riskClass = "risk-low";
      recommendation = "Tiếp tục phác đồ điều trị nhiễm khuẩn và đánh giá chức năng tạng hàng ngày.";
    } else {
      riskLevel = `Nhiễm khuẩn huyết - Sepsis (Tổng điểm &ge; 2)`;
      riskClass = "risk-high";
      recommendation = "Bệnh nhân có suy tạng do nhiễm khuẩn, nguy cơ tử vong >10%. Khẩn trương bù dịch, cấy máu, dùng kháng sinh hoạt lực mạnh sớm, tối ưu hóa vận mạch giữ MAP &ge; 65 mmHg.";
    }
  }
  else if (scoreId === "apgar") { // NEW
    scoreName = "APGAR";
    maxScore = 10;

    const skin = parseInt(formData.get("skin") || "0");
    const pulse = parseInt(formData.get("pulse") || "0");
    const grimace = parseInt(formData.get("grimace") || "0");
    const activity = parseInt(formData.get("activity") || "0");
    const resp = parseInt(formData.get("resp") || "0");

    parameters = { skin, pulse, grimace, activity, resp };
    score = skin + pulse + grimace + activity + resp;

    if (score >= 7) {
      riskLevel = `Trẻ sơ sinh khỏe mạnh (Điểm: ${score})`;
      riskClass = "risk-low";
      recommendation = "Sức khỏe trẻ tốt. Chuyển sang chế độ chăm sóc và theo dõi sơ sinh thường quy tại giường.";
    } else if (score >= 4 && score <= 6) {
      riskLevel = `Trẻ bị ngạt nhẹ đến trung bình (Điểm: ${score})`;
      riskClass = "risk-medium";
      recommendation = "Trẻ có biểu hiện ức chế hô hấp. Cần kích thích vật lý, hút sạch nhớt họng/mũi, thở oxy hỗ trợ nhẹ và đánh giá lại chỉ số APGAR sau mỗi 5 phút.";
    } else {
      riskLevel = `Trẻ ngạt nặng nguy kịch (Điểm: ${score} &le; 3)`;
      riskClass = "risk-high";
      recommendation = "Đe dọa tính mạng! Khẩn trương tiến hành hồi sức sơ sinh nâng cao ngay lập tức (bóp bóng qua mặt nạ, đặt nội khí quản, ép tim ngoài lồng ngực).";
    }
  }
  else if (scoreId === "curb65") { // NEW
    scoreName = "CURB-65";
    maxScore = 5;

    const confusion = formData.has("confusion");
    const urea = formData.has("urea");
    const rr = formData.has("rr");
    const bp = formData.has("bp");
    const age65 = formData.has("age65");

    parameters = { confusion, urea, rr, bp, age65 };
    if (confusion) score += 1;
    if (urea) score += 1;
    if (rr) score += 1;
    if (bp) score += 1;
    if (age65) score += 1;

    if (score <= 1) {
      riskLevel = `Nguy cơ tử vong thấp (Điểm: ${score})`;
      riskClass = "risk-low";
      recommendation = "Có thể an tâm cho điều trị ngoại trú (trú tại nhà, uống kháng sinh) nếu không có các yếu tố xã hội cản trở.";
    } else if (score === 2) {
      riskLevel = `Nguy cơ tử vong trung bình (Điểm: 2)`;
      riskClass = "risk-medium";
      recommendation = "Chỉ định nhập viện điều trị nội trú ngắn ngày hoặc thiết lập theo dõi cực kỳ sát ngoại trú.";
    } else {
      riskLevel = `Nguy cơ tử vong cao (Điểm: &ge; 3)`;
      riskClass = "risk-high";
      recommendation = "Bắt buộc nhập viện cấp cứu nội trú. Nếu điểm số là 4 hoặc 5, cần cân nhắc chuyển ngay vào khoa hồi sức tích cực (ICU).";
    }
  }
  else if (scoreId === "mews") { // NEW
    scoreName = "MEWS";
    maxScore = 14;

    const hr = parseInt(formData.get("hr") || "0");
    const sbp = parseInt(formData.get("sbp") || "0");
    const rr = parseInt(formData.get("rr") || "0");
    const temp = parseInt(formData.get("temp") || "0");
    const avpu = parseInt(formData.get("avpu") || "0");

    parameters = { hr, sbp, rr, temp, avpu };
    score = hr + sbp + rr + temp + avpu;

    if (score <= 2) {
      riskLevel = `Nguy cơ suy sụp thấp (Điểm: ${score})`;
      riskClass = "risk-low";
      recommendation = "Tiếp tục theo dõi các chỉ số sinh hiệu theo ca trực thường quy của điều dưỡng khoa.";
    } else if (score >= 3 && score <= 4) {
      riskLevel = `Nguy cơ suy sụp trung bình (Điểm: ${score})`;
      riskClass = "risk-medium";
      recommendation = "Tăng tần suất đo sinh hiệu (mỗi 4 giờ/lần). Báo cáo bác sĩ trực khoa để xuống trực tiếp đánh giá lại bệnh nhân.";
    } else {
      riskLevel = `Báo động nguy cơ suy sụp cao (Điểm: &ge; 5)`;
      riskClass = "risk-high";
      recommendation = "Tình trạng chuyển biến rất xấu! Báo động khẩn cho bác sĩ điều trị và Đội Phản ứng nhanh nội viện (RRT). Chuẩn bị sẵn bóng bóp, oxy và chuyển phòng cấp cứu.";
    }
  }

  // --- Display Result UI ---
  resultScoreValue.textContent = score;
  
  const maxLabel = resultScoreCircle.querySelector("#result-score-max");
  if (maxLabel) maxLabel.innerHTML = `Điểm<br><span class="text-[9px] text-slate-400">/ ${maxScore}</span>`;

  resultRiskBadge.className = "mt-3.5 px-3 py-1 text-[10px] font-bold rounded-full text-center tracking-wider uppercase";
  if (riskClass === "risk-low") {
    resultRiskBadge.classList.add("bg-emerald-100", "text-emerald-800", "border", "border-emerald-200");
    resultRiskBadge.textContent = "Thấp";
    resultScoreCircle.style.borderColor = "#10b981";
  } else if (riskClass === "risk-medium") {
    resultRiskBadge.classList.add("bg-amber-100", "text-amber-800", "border", "border-amber-200");
    resultRiskBadge.textContent = "Trung bình";
    resultScoreCircle.style.borderColor = "#f59e0b";
  } else {
    resultRiskBadge.classList.add("bg-rose-100", "text-rose-800", "border", "border-rose-200");
    resultRiskBadge.textContent = "Cao";
    resultScoreCircle.style.borderColor = "#f43f5e";
  }

  resultRiskLevel.innerHTML = riskLevel;
  resultRecommendation.textContent = recommendation;
  
  calculatorResultPanel.classList.remove("hidden");
  calculatorResultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Save to Database
  try {
    const res = await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scoreType: scoreName,
        score: score,
        parameters: parameters,
        resultSummary: `${riskLevel.replace(/<[^>]*>/g, '')}. Khuyến cáo: ${recommendation}`
      })
    });
    if (res.ok) {
      fetchHistory();
    }
  } catch (error) {
    console.error("Lỗi lưu lịch sử tính điểm:", error);
  }
}

async function fetchHistory() {
  try {
    const res = await fetch("/api/history");
    const data = await res.json();
    renderHistoryList(data);
  } catch (error) {
    console.error("Lỗi tải lịch sử tính điểm:", error);
  }
}

function renderHistoryList(historyArray) {
  if (historyArray.length === 0) {
    historyListContainer.innerHTML = `
      <div class="text-center py-10 text-slate-400 text-xs">
        <i class="fa-solid fa-folder-open text-2xl mb-2 block text-slate-300"></i>
        Chưa có lịch sử tính toán nào được lưu.
      </div>
    `;
    return;
  }

  historyListContainer.innerHTML = "";
  historyArray.forEach(item => {
    const dateObj = new Date(item.calculated_at);
    const timeStr = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')} ${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
    
    let badgeClass = "bg-slate-100 text-slate-700";
    const summary = item.result_summary.toLowerCase();
    if (summary.includes("nguy cơ cao") || summary.includes("nguy kịch") || summary.includes("sepsis") || summary.includes("báo động")) {
      badgeClass = "bg-rose-50 text-rose-700 border border-rose-100";
    } else if (summary.includes("nguy cơ vừa") || summary.includes("trung bình")) {
      badgeClass = "bg-amber-50 text-amber-700 border border-amber-100";
    } else {
      badgeClass = "bg-emerald-50 text-emerald-700 border border-emerald-100";
    }

    const card = document.createElement("div");
    card.className = "bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm hover:shadow transition-all duration-200 text-xs flex flex-col gap-2 relative overflow-hidden";
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-extrabold text-slate-800 text-xs tracking-tight">${item.score_type}</span>
        <span class="text-slate-400 font-mono text-[9px]">${timeStr}</span>
      </div>
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400">Kết quả:</span>
          <span class="font-bold text-slate-700">${item.score} điểm</span>
        </div>
        <span class="px-2 py-0.5 rounded font-bold text-[9px] ${badgeClass}">
          ${summary.includes("nguy cơ cao") || summary.includes("báo động") ? "Cao" : summary.includes("trung bình") ? "Vừa" : "Thấp"}
        </span>
      </div>
      <p class="text-slate-500 leading-relaxed text-[10px] border-t border-slate-50 pt-2 line-clamp-2" title="${item.result_summary}">
        ${item.result_summary}
      </p>
    `;
    historyListContainer.appendChild(card);
  });
}

function exportCalculatorsHistoryCSV() {
  fetch("/api/history")
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        alert("Chưa có lịch sử tính điểm nào để xuất!");
        return;
      }

      let csv = "\ufeff";
      csv += "Thời Gian Tính,Thang Điểm,Điểm Số,Thông Số Nhập,Kết Luận Lâm Sàng\n";

      data.forEach(item => {
        const dateObj = new Date(item.calculated_at);
        const dateText = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')} ${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
        
        csv += `"${dateText}","${item.score_type}",${item.score},"${JSON.stringify(item.parameters).replace(/"/g, '""')}","${item.result_summary.replace(/"/g, '""')}"\n`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Lich_Su_Tính_Điểm_Lâm_Sàng_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => {
      console.error("Lỗi tải lịch sử tính điểm:", err);
    });
}
