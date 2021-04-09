const Url = {
  pageSize: 20,
  pageSizeOption: [10, 20, 30, 50],
  // 远大组织树
  bOrgTree: {
    query: '/api/v1/organizations/tree',
    add: '/api/v1/organizations/add',
    delete: '/api/v1/organizations/delete',
    edit: '/api/v1/organizations/edit',
    countOrgUserNum: '/api/v1/organizations/countOrgUserNum'
  },
  bRole: {
    query: '/api/v1/role/list',
    saveUserRole: '/api/v1/role/saveUserRole'
  },
  bEmpInfo: {
    add: '/api/v1/users/add',
    query: '/api/v1/users/list',
    delete: '/api/v1/users/batchDelete',
    lock: '/api/v1/users/batchLock',
    reset: '/api/v1/users/batchReset',
    unLock: '/api/v1/users/batchUnlock',
    edit: '/api/v1/users/edit',
    turnOrg: '/api/v1/users/batchOrg',
    excelImport: '/api/v1/users/excelImport',
    export: '/api/v1/users/export',
    templateFileDownload: '/api/v1/users/templateFileDownload'
  },
  jobStations: {
    query: '/api/v1/jobstations/tree',
    add: '/api/v1/jobstations/add',
    addGroup: '/api/v1/jobstations/addgroup',
    deleteJob: '/api/v1/jobstations/deletejob',
    deleteGroup: '/api/v1/jobstations/deletegroup',
    editGroup: '/api/v1/jobstations/editgroup',
    edit: '/api/v1/jobstations/editjob'
  },
  Categorys: {
    add: '/api/v1/categorys/add',
    delete: '/api/v1/categorys/delete',
    edit: '/api/v1/categorys/edit',
    query: '/api/v1/categorys/tree',
    queryList: '/api/v1/categorys/listCategoryGroup',
    queryCompany: '/api/v1/allocate/enterpriseCategoryTree'
  },
  teacherManage: {
    query: '/api/v1/teachers/list',
    getInfo: '/api/v1/teachers/get',
    edit: '/api/v1/teachers/edit',
    delete: '/api/v1/teachers/delete',
    add: '/api/v1/teachers/add'
  },
  // 素材接口
  material: {
    batchCategory: '/api/v1/material/batchCategory',
    delete: '/api/v1/material/batchDelete',
    batchOrg: '/api/v1/material/batchOrg',
    query: '/api/v1/material/list',
    update: '/api/v1/material/update',
    getMaterialPreviewUrl: '/api/v1/material/getMaterialPreviewUrl'
  },
  // 考试管理接口
  test: {
    addPaper: '/api/v1/exams/addPaper',
    examPaperDetail: '/api/v1/exams/examPaperDetail',
    addExam: '/api/v1/exams/addExam',
    addItem: '/api/v1/exams/addItem',
    addMember: '/api/v1/exams/addMember',
    addPaperToExam: '/api/v1/exams/addPaperToExam',
    deleteItem: '/api/v1/exams/deleteItem',
    batchdelete: '/api/v1/examquestions/batchdelete',
    deletePaper: '/api/v1/exams/deletePaper',
    editPaper: '/api/v1/exams/editPaper',
    examList: '/api/v1/exams/examList',
    examResultList: '/api/v1/exams/examResultList',
    examItemResult: '/api/v1/exams/examItemResult',
    paperlist: '/api/v1/exams/paperList',
    publishExam: '/api/v1/exams/publishExam',
    examMarking: '/api/v1/exams/examMarking',
    examDetail: '/api/v1/exams/examDetail',
    editExam: '/api/v1/exams/editExam',
    editMember: '/api/v1/exams/editMember',
    batchDeleteExam: '/api/v1/exams/batchDeleteExam',
    batchDeleteExamPaper: '/api/v1/exams/batchDeleteExamPaper',
    templateFileDownload: '/api/v1/exams/templateFileDownload',
    exportExamResult: '/api/v1/exams/exportExamResult',
    batchUpdateExamOrg: '/api/v1/exams/batchUpdateExamOrg',
    listExamResult: '/api/v1/exams/listExamResult'
  },
  // 题目接口
  examquestions: {
    add: '/api/v1/examquestions/add',
    typelist: '/api/v1/examquestions/typelist',
    // uploadPaper: '/api/v1/examquestions/examPaperExcelImport',
    uploadPaper: '/api/v1/examquestions/previewSelectedTemplateExcel',
    saveExamPaperTemplateData: '/api/v1/examquestions/saveExamPaperTemplateData',
    delete: '/api/v1/examquestions/delete',
    edit: '/api/v1/examquestions/edit',
    query: '/api/v1/examquestions/list',
    isUsed: '/api/v1/examquestions/isUsed',
    // questionExcelImport: '/api/v1/examquestions/questionExcelImport',
    questionExcelImport: '/api/v1/examquestions/previewSelectedTemplateExcel',
    saveExamQuestionTemplateData: '/api/v1/examquestions/saveExamQuestionTemplateData',
    batchUpdateExamPaperCategory: '/api/v1/examquestions/batchUpdateExamPaperCategory',
    batchUpdateExamPaperOrg: '/api/v1/examquestions/batchUpdateExamPaperOrg',
    batchUpdateExamQuestionCategory: '/api/v1/examquestions/batchUpdateExamQuestionCategory'
  },
  // 视频接口
  video: {
    getKey: '/api/v1/vod/createUploadVideo',
    refreshKey: '/api/v1/vod/refreshUploadVideo'
  },
  // 课程接口
  courses: {
    add: '/api/v1/courses/add',
    query: '/api/v1/courses/list',
    getCount: '/api/v1/courses/count',
    detail: '/api/v1/courses/get',
    edit: '/api/v1/courses/edit',
    delete: '/api/v1/courses/delete',
    editCourseStatus: '/api/v1/courses/editCourseStatus',
    batchUpdateCourseCategory: '/api/v1/courses/batchUpdateCourseCategory',
    batchUpdateCourseOrg: '/api/v1/courses/batchUpdateCourseOrg'
  },
  // 培训接口
  training: {
    exportTrainNum: '/api/v1/trainings/exportStudentData',
    add: '/api/v1/trainings/add',
    edit: '/api/v1/trainings/update',
    addstage: '/api/v1/trainings/addTrainingPlanStage',
    addTask: '/api/v1/trainings/addTrainingPlanTask',
    listTrainingPlanReview: '/api/v1/trainings/listTrainingPlanReview',
    updateStage: '/api/v1/trainings/batchUpdateTrainingPlanStage',
    updateTask: '/api/v1/trainings/batchUpdateTrainingPlanTask',
    detail: '/api/v1/trainings/detail',
    deleteStage: '/api/v1/trainings/deleteTrainingPlanStage',
    deleteTask: '/api/v1/trainings/deleteTrainingPlanTask',
    query: '/api/v1/trainings/list',
    stageQuery: '/api/v1/trainings/listTrainingPlanStage',
    taskQuery: '/api/v1/trainings/listTrainingPlanTask',
    addMember: '/api/v1/trainings/addMember',
    copy: '/api/v1/trainings/copy',
    listMember: '/api/v1/trainings/listMember',
    delete: '/api/v1/trainings/delete',
    deleteTrainingPlanMember: '/api/v1/trainings/deleteTrainingPlanMember',
    getMemberTrainingPlanDetail: '/api/v1/trainings/getMemberTrainingPlanDetail',
    studyDetail: '/api/v1/trainings/listPageTrainingPlanTaskDetail',
    batchUpdateTrainingPlanOrg: '/api/v1/trainings/batchUpdateTrainingPlanOrg'
  },
  // 学员端考试接口
  testStu: {
    query: '/api/v1/myTrainingPlan/examList',
    examDetail: '/api/v1/myTrainingPlan/examDetail',
    getTopic: '/api/v1/myTrainingPlan/examStart',
    submitAnswer: '/api/v1/myTrainingPlan/submitAnswer',
    examItemResult: '/api/v1/myTrainingPlan/examItemResult'
  },
  // 学员端班级接口
  classStu: {
    getClassList: '/api/v1/myTrainingPlan/list',
    detail: '/api/v1/myTrainingPlan/detail',
    courseTaskFinish: '/api/v1/myTrainingPlan/courseTaskFinish',
    courseTaskList: '/api/v1/myTrainingPlan/courseTaskList',
    courseTaskStart: '/api/v1/myTrainingPlan/courseTaskStart',
    getMaterial: '/api/v1/myTrainingPlan/getMaterial',
    learningCourse: '/api/v1/myTrainingPlan/learningCourse',
    moreCourses: '/api/v1/myTrainingPlan/moreCourses',
    courseMember: '/api/v1/myTrainingPlan/courseMember',
    listCourseReview: '/api/v1/myTrainingPlan/listCourseReview',
    saveCourseReview: '/api/v1/myTrainingPlan/saveCourseReview',
    saveTrainingPlanReview: '/api/v1/myTrainingPlan/saveTrainingPlanReview',
    getCourseDetail: '/api/v1/myTrainingPlan/getCourseDetail',
    isFavoriteCourse: '/api/v1/myFavorite/isFavoriteCourse',
    saveFavoriteCourse: '/api/v1/myFavorite/saveFavoriteCourse',
    deleteFavoriteCourse: '/api/v1/myFavorite/deleteFavoriteCourse',
    listCourseFavorite: '/api/v1/myFavorite/listCourseFavorite',
    studentDynamics: '/api/v1/myTrainingPlan/studentDynamics',
    logUserLearnDuration: '/api/v1/myTrainingPlan/logUserLearnDuration'
  },
  noticeSever: {
    notifyMnsVodCallback: 'notifyMnsVodCallback'
  },
  // 远大个人中心信息
  userCenter: {
    getMyUserInfo: '/api/v1/myUserCenter/getMyUserInfo',
    editMyUserInfo: '/api/v1/myUserCenter/editMyUserInfo',
    editPassword: '/api/v1/myUserCenter/editPassword'
  },
  // 首页图表信息管理端 ，学员端
  homePage: {
    homePageData: '/api/v1/home/homePageData',
    getMyLearnChartData: '/api/v1/myUserCenter/getMyLearnChartData',
    getMyLearnHistoryData: '/api/v1/myUserCenter/getMyLearnHistoryData'
  },
  // 登录
  login: 'login',
  ssoLogin: 'ssoLogin',
  logout: 'logout',
  getUserInfo: 'user/getUserInfo',
  // 消息推送
  changeSocketIOPushId: 'changeSocketIOPushId',
  sendMessageToPcUser: 'sendMessageToPcUser',
  sendMessageToAppUser: 'sendMessageToAppUser',
  getMailCount: 'getMailCount',
  // 文件接口
  file: {
    upload: 'file/upload',
    download: 'file/download',
    downloadByUuid: 'file/downloadByUuid',
    signToUpload: '/api/v1/vod/createOssUploadPolicy',
    uploadAvatarUrl: '/api/v1/teachers/upload'
  },
  // Web用户接口
  user: {
    add: 'user/add',
    changeAvatar: 'user/changeAvatar',
    changePassword: 'user/changePassword',
    delete: 'user/delete',
    deleteList: 'user/deleteList',
    getUserInfo: 'user/getUserInfo',
    selectAll: 'user/selectAll',
    selectById: 'user/selectById',
    update: 'user/update',
    allNotFaceToFaceTeacher: '/user/allNotFaceToFaceTeacher'
  },
  stats: {
    vehicle: 'stats/vehicle',
    driver: 'stats/driver',
    user: 'stats/user'
  },
  // 定位和轨迹接口
  location: {
    add: 'location/add',
    update: 'location/update',
    selectAll: 'location/selectAll',
    selectAllLatestLocation: 'location/selectAllLatestLocation',
    selectByLocatorId: 'location/selectByLocatorId',
    searchLocatorId: 'location/searchLocatorId',
    selectById: 'location/selectById',
    gpsLocationList: 'location/gpsLocationList'
  },
  // 知识接口
  knowledge: {
    query: '/tag/queryTagsByPage',
    add: '/tag/add',
    delete: '/tag/delete',
    update: '/tag/update',
    getTreeList: '/category/queryCourseCategoryList',
    addTreeNode: '/category/add',
    deleteTreeNode: '/category/deleteById',
    deleteNode: '/category/delete',
    transferNode: '/category/transfer',
    updateTreeNode: '/category/updateCourseCategoryNameById'
  },
  // 消息接口
  message: {
    add: 'message/add',
    update: 'message/update',
    selectAll: 'message/selectAll',
    selectById: 'message/selectById',
    publish: 'message/publish',
    receiptDetail: 'message/receiptDetail',
    notReceiptDetail: 'message/notReceiptDetail',
    delete: 'message/delete',
    deleteList: 'message/deleteList',
    unreadCount: '/message/unreadCount',
    query: '/message/query',
    read: '/message/read',
    todoQuery: '/message/todo/query'
  },
  // v学堂公共接口
  vBaseUrl: {
    searchAdmin: '/admin/query', // 查询管理员
    taskExecutor: '/admin/taskExecutor', // 任务签收人,
    changeAvatar: '/user/changeAvatar',
    adminDetail: '/admin/detail'
  },
  // 面授课程接口
  Courses: {
    query: '/course/face/query',
    queryMyUnderOrg: '/course/queryMyUnderOrg',
    // queryALlSupplier: '/course/queryAllSupplierOrg',
    queryALlSupplier: 'supplier/all',
    // queryMyChildOrg: '/org/myChildOrg',
    queryMyChildOrg: 'org/myOrgAndChildOrg', // 组织下拉列表，管理员本级组织和直属下级组织(可见范围)
    queryPosition: '/position/all',
    addFaceCourse: '/course/face/add',
    getFaceCourseDetail: '/course/face/detail',
    deleteCourseList: '/course/deleteList',
    canclePublish: '/course/publish',
    updateFaceCourse: '/course/face/update',
    queryFaceCourseTeacher: '/course/face/teacherMgr/query',
    addFaceCourseTeacher: '/course/face/teacherMgr/add',
    deleteFaceCourseTeacher: '/course/face/teacherMgr/delete',
    deleteCourseById: '/course/deleteById',
    traiRecord: '/course/face/record/query',
    summary: '/course/face/record/summary'
  },
  // 移动端手机首页配置 /web/app/home/get
  mobileConfig: {
    homeGet: '/app/home/get',
    homeSet: '/app/home/set'
  },
  // 公开课课程接口
  openClass: {
    query: '/course/public/query',
    addPublicCourse: '/course/public/add',
    getPublicCourseDetail: '/course/public/detail',
    updatePublicCourse: '/course/public/update',
    openStudentInfo: '/course/public/queryStudentByPage',
    generateSignInQrcode: '/course/public/generateSignInQrcode',
    generateSignOutQrcode: '/course/public/generateSignOutQrcode',
    wjSampleData: '/course/public/wj/sampleData',
    getExperience: '/course/public/getExperience'
  },
  // 题目管理接口
  topicManagem: {
    query: '/question/query',
    deleteList: '/question/deleteList',
    add: '/question/add',
    detail: '/question/detail',
    update: '/question/update'
  },
  // 题库管理接口
  itemBankManagem: {
    query: '/chapter/queryWithQuestionTypeInfo',
    add: '/chapter/add',
    detail: '/chapter/detail',
    update: '/chapter/update',
    deleteList: '/chapter/deleteList'
  },
  // 试卷管理接口
  examPaper: {
    query: '/paper/query',
    add: '/paper/add',
    addFromExcel: '/paper/addFromExcel',
    addRandomPaper: '/paper/addRandomPaper',
    detail: '/paper/detail',
    detailOfRandomPaper: '/paper/detailOfRandomPaper',
    update: '/paper/update',
    updateRandomPaper: '/paper/updateRandomPaper',
    copy: '/paper/copy',
    deleteList: '/paper/deleteList',
    questionTypeInfo: '/paper/questionTypeInfo',
    addQuestion: '/paper/addQuestion',
    deleteQuestionList: '/paper/deleteQuestionList'
  },
  // 企业用户
  enterprises: {
    add: '/api/v1/enterprises/add',
    delete: '/api/v1/enterprises/delete',
    edit: '/api/v1/enterprises/edit',
    query: '/api/v1/enterprises/list'
  },
  // 课程分配
  courseAllocate: {
    allocate: '/api/v1/allocate/allocateCourse',
    allocateDelete: '/api/v1/allocate/allocateDelete',
    allocateDetail: '/api/v1/allocate/allocateDetail',
    allocateList: '/api/v1/allocate/allocateList',
    query: '/api/v1/allocate/courseList',
    allocateCheck: '/api/v1/allocate/allocateCheck',
    allocateCourseEdit: '/api/v1/allocate/allocateCourseEdit'
  },
  baseInfo: {
    peopleInfo: '/user/query',
    teacherInfo: '/teacher/query'
  },
  // 组织树
  orgTree: {
    query: '/org/orgTree',
    addTreeNode: '/org/add',
    updateTreeNode: '/org/update',
    deleteTreeNode: '/org/delete'
  },
  // 课件库接口
  courseWare: {
    query: '/course/ware/query',
    delete: '/course/ware/delete',
    invalid: '/course/ware/invalid',
    effective: '/course/ware/effective',
    addCourseWare: '/course/ware/addCourseWare',
    effectiveQuery: '/course/ware/effective/query'
  },
  // 导入、模板下载接口
  importUrl: {
    importChapterQuestion: '/excel/importChapterQuestion', // 导入题库
    importPaper: '/web/excel/importPaper', // 导入试卷
    importProjectStudent: '/web/excel/importProjectStudent', // 导入项目学员名单
    importUserList: '/excel/importUserList', // 导入考试名单
    getPaperTemplate: '/file/getPaperTemplate', // 获取导入试卷模板excle
    getUserListTemplate: '/file/getUserListTemplate' // 获取导入名单模板excle
  },
  documentManage: {
    queryFileCourse: '/course/document/query',
    addFileCourse: '/course/document/add',
    getDocumentCourseDetail: '/course/document/detail',
    updateDocumentCourse: '/course/document/update'
  },
  onlineManage: {
    queryOnlineCourse: '/course/online/query',
    addOnlineCourse: '/course/online/add',
    getOnlineCourseDetail: '/course/online/detail',
    updateOnlineCourse: '/course/online/update'
  },
  combinationManage: {
    queryCombinCourse: '/course/series/query',
    addCombinCourse: '/course/series/add',
    getCombinCourseDetail: '/course/series/detail',
    updateCombinCourse: '/course/series/update'
  },
  caseManage: {
    queryCaseCourse: '/course/case/query',
    addFileCourse: '/course/addDocumentCourse',
    getDocumentCourseDetail: '/course/getDocumentCourseDetail',
    updateDocumentCourse: '/course/updateDocumentCourse'
  },
  paperUrl: {
    update: '/wj/publish/update',
    detail: '/wj/publish/detail',
    edit: '/wj/publish/edit',
    qwqnare: '/wj/queryWholeQuestionnaire',
    qtnaireupte: '/wj/updateQuestionnaire',
    qtnairecrte: '/wj/createQuestionnaire',
    endMsgQtnaireupte: '/wj/updateQuestionnaireEndMsg',
    asociset: '/wj/setAssociateLogic',
    crteupteques: '/wj/createOrUpdateQuestion',
    delQsn: '/wj/deleteQuestion',
    delPgQsn: '/wj/deletePageQuestion',
    copyQsn: '/wj/copyQuestion',
    moveQsn: '/wj/moveQsn',
    updateQtnaireStatus: '/wj/updateQuestionnaireStatus',
    templateUpdate: '/wj/status/template/update',
    previewQueryWJ: '/wj/previewQueryWJ',
    updateStates: '/wj/status/update',
    wjConfig: '/wj/updateWjConfig',
    queryAfterQsn: '/wj/queryQsnsAferThisQsn',
    delasociset: '/wj/delAssociateLogic',
    queryThisQsn: '/wj/queryQsnById',
    queryMode: '/wj/queryQuestionnaireTemplateByPage',
    reviewsData: '/wj/reviewsData',
    sampledata: '/wj/querySampleData',
    sampledata_del: '/wj/removeSampleData',
    chartdata: '/wj/queryChartData',
    queryChartItem: '/wj/queryChartItemByPage',
    queryvCollegeWjByPage: '/wj/queryQuestionnaireCaseByPage',
    getUserAnswer: '/wj/getUserAnswer',
    wjGetWToken: '/wj/getWToken'
  },
  // 部门
  org: {
    queryAll: '/org/myAllDepartment', // 所有部门
    orgTree: '/org/orgTree'
  },
  // 岗位
  position: {
    query: '/position/all'
  },
  // 师资管理
  teacher: {
    addTeacherWithin: '/teacher/add', // 添加内部讲师
    addTeacherWithout: '/teacher/external/add', // 添加外部讲师
    queryTeacher: '/teacher/query', // 讲师
    queryCaseTeacher: '/teacher/case/query', // 案例萃取师，分页查询
    queryMicroTeacher: '/teacher/micro/query', // 微课设计师，分页查询
    queryTeacherInfo: '/teacher/details', // 讲师详情
    queryCaseInfo: '/teacher/case/details', // 案例萃取师详情
    queryMicroInfo: '/teacher/micro/details', // 微课设计师详情
    delete: '/teacher/delete', // 测试用删除
    updateStar: '/teacher/updateStar', // 更新星级
    updateTagList: '/teacher/updateTagList',
    updateIntroduction: '/teacher/updateIntroduction', // 修改讲师介绍
    updateInternalEvaluation: '/teacher/updateInternalEvaluation', // 修改内部评价
    disableTeacher: '/teacher/disable', // 失效讲师
    disableMicro: '/teacher/micro/disable', // 失效微课设计师
    disableCase: '/teacher/case/disable', // 失效案例萃取师
    enableTeacher: '/teacher/enable', // 生效讲师
    enableMicro: '/teacher/micro/enable', // 生效微课设计师
    enableCase: '/teacher/case/enable', // 生效案例萃取师
    deleteCase: '/teacher/case/delete', // 删除案例萃取师
    deleteMicro: '/teacher/micro/delete', // 删除微课设计师
    updatePhotoUrl: '/teacher/updatePhotoUrl', // 更新头像
    disableMultipleTeacher: '/teacher/disableList', // 批量失效讲师
    disableMultipleCaseTeacher: '/teacher/case/disableList', // 批量失效案例萃取师
    disableMultipleMicroTeacher: '/teacher/micro/disableList', // 批量失效微课设计师
    enableMultipleTeacher: '/teacher/enableList', // 批量失效讲师
    enableMultipleCaseTeacher: '/teacher/case/enableList', // 批量失效案例萃取师
    enableMultipleMicroTeacher: '/teacher/micro/enableList', // 批量失效微课设计师
    deleteMultipleMicroTeacher: '/teacher/micro/deleteList', // 批量删除微课设计师
    deleteMultipleCaseTeacher: '/teacher/case/deleteList', // 批量删除案例萃取师
    teachCourse: '/teacher/course/canTeach', // 讲师可讲的课程列表
    courseRecord: '/teacher/course/query',
    queryTeacherCourse: '/teacher/course/canTeach/search',
    caseCourse: '/teacher/case/course/query', // 案例萃取师课程列表
    microCourse: '/teacher/micro/course/query', // 微课设计师课程列表
    teacherSummary: '/teacher/summary' // 讲师统计信息
  },
  supplier: {
    queryAll: '/supplier/all', // 全部供应商
    queryByPage: '/supplier/query', // 分页查询供应商
    addSupplier: '/supplier/add', // 添加供应商
    supplierCourseList: '/supplier/course/query', // 供应商课程列表
    supplierTeacherList: '/supplier/teacher/query', // 供应商讲师列表
    queryDetail: '/supplier/details', // 供应商详情
    updateInfo: '/supplier/update', // 更新详情
    delete: '/supplier/delete', // 删除供应商
    deleteMultiple: '/supplier/deleteList', // 批量删除
    disableMultiple: '/supplier/disableList', // 批量失效
    enableMultiple: '/supplier/enableList', // 批量生效
    enable: '/supplier/enable', // 生效
    disable: '/supplier/disable', // 失效
    addSupplierProduct: '/supplier/product/add', // 添加学习产品
    querySupplierProduct: '/supplier/product/query', // 分页查询其它学习产品
    deleteProductOne: '/supplier/product/delete', // 删除其它学习产品
    deleteProductMultiple: '/supplier/product/deleteList', // 批量删除其它学习产品
    supplierProductDetail: '/supplier/product/findById',
    updateSupplierProduct: '/supplier/product/update'
  },
  // 培训方案
  scheme: {
    query: '/training/scheme/query', // 分页查询
    add: '/training/scheme/add', // 添加
    update: '/training/scheme/update', // 更新
    queryDetail: '/training/scheme/findById', // 查详情
    deleteOne: '/training/scheme/delete',
    deleteMultiple: '/training/scheme/deleteList'
  },
  project: {
    query: '/training/project/query',
    queryDetail: '/training/project/findById',
    update: '/training/project/update',
    addProjectByScheme: '/training/project/addByScheme',
    deleteOne: '/training/project/delete',
    deleteMultiple: '/training/project/deleteList',
    summaryDetail: '/training/project/summary/detail',
    deleteCost: '/training/project/summary/deleteCost',
    updateSummary: '/training/project/summary/update',
    cancel: '/training/project/cancel',
    publish: '/training/project/publish',
    myGoing: '/training/project/myGoing'
  },
  task: {
    query: '/training/task/query',
    assignQuery: '/training/task/assign/query',
    add: '/training/task/add',
    findById: '/training/task/findById',
    update: '/training/task/update',
    delete: '/training/task/delete',
    finish: '/training/task/finish',
    release: '/training/task/release',
    completeQuery: '/training/task/complete/query',
    sendRemind: '/training/task/sendRemind',
    projectQuery: '/training/task/project/query',
    executeQuery: '/training/task/execute/query',
    assign: '/training/task/assign',
    confirm: '/training/task/confirm',
    projectAdd: '/training/project/add',
    projectDetail: '/training/project/findById',
    projectUpdate: '/training/project/update',
    taskFeedback: '/training/task/feedback'
  },
  projectNode: {
    query: '/training/project/node/query',
    nodeTypeList: '/training/project/node/typeList',
    addOnlineNode: '/training/project/node/online/add',
    addFaceCourseNode: '/training/project/node/face/course/add',
    updateFaceCourseNode: '/training/project/node/face/course/update',
    addSignNode: '/training/project/node/sign/add',
    addPlanNode: '/training/project/node/action/plan/add',
    addHomeworkNode: '/training/project/node/homework/add',
    addForumNode: '/training/project/node/forum/add',
    addElseNode: '/training/project/node/else/add',
    addQuestionnaireNode: '/training/project/node/questionnaire/add',
    queryFaceCourseTeacher: '/training/project/node/face/course/teacher/query',
    faceCourseDetail: '/training/project/node/face/course/detail',
    faceCourseSignList: '/training/project/node/face/course/signList',
    faceCourseStudentSignList: '/training/project/node/face/course/studentSignList',
    faceCourseExperienceList: '/training/project/node/face/course/experienceList',
    faceCourseSignIn: '/training/project/node/face/course/generateSignInQrcode',
    faceCourseUserSignDetail: '/training/project/node/face/course/studentSignDetail',
    faceCourseEndSign: '/training/project/node/face/course/endSign',
    updateFaceCourseSign: '/training/project/node/face/course/updateStudentSign',
    onlineNodeDetail: '/training/project/node/online/detail',
    onlineNodeData: '/training/project/node/online/query',
    updateOnlineNode: '/training/project/node/online/update',
    forumNodeDetail: '/training/project/node/forum/detail',
    forumNodeExperienceList: '/training/project/node/forum/experienceList',
    updateForumNode: '/training/project/node/forum/update',
    signNodeDetail: '/training/project/node/sign/detail',
    updateSignNode: '/training/project/node/sign/update',
    updateSignStatus: '/training/project/node/sign/updateStudentSign',
    signList: '/training/project/node/sign/query',
    studentSignDetail: '/training/project/node/sign/studentSignDetail',
    deleteOne: '/training/project/node/delete',
    deleteMultiple: '/training/project/node/deleteList',
    elseNodeTypeList: '/training/project/node/elseNodeTypeList',
    homeworkNodeDetail: '/training/project/node/homework/detail',
    updateHomeworkNode: '/training/project/node/homework/update',
    homeworkList: '/training/project/node/homework/query',
    auditUserHomework: '/training/project/node/auditUserHomework',
    planNodeDetail: '/training/project/node/action/plan/detail',
    updatePlanNode: '/training/project/node/action/plan/update',
    planList: '/training/project/node/action/plan/query',
    studentPlanDetail: '/training/project/node/action/plan/student/plan',
    studentPlanFeedbackDetail: '/training/project/node/action/plan/student/feedback',
    auditPlan: '/training/project/node/auditActionPlan',
    auditPlanFeedback: '/training/project/node/auditActionFeedback',
    questionnaireNodeDetail: '/training/project/node/questionnaire/detail',
    updateQuestionnaireNode: '/training/project/node/questionnaire/update',
    elseNodeDetail: '/training/project/node/detail',
    updateElseNode: '/training/project/node/else/update',
    qrcode: '/common/qrcode/signInTraining',
    addExamNode: '/training/project/node/exam/add',
    updateExamNode: '/training/project/node/exam/update',
    examNodeDetail: '/training/project/node/exam/detail',
    evaluation: '/training/project/node/evaluation'
  },
  projectStudent: {
    query: '/training/project/student/query',
    addList: '/training/project/student/addList',
    deleteOne: '/training/project/student/delete',
    deleteMultiple: '/training/project/student/deleteList',
    graduate: '/training/project/student/graduate',
    graduateMultiple: '/training/project/student/graduateList',
    notGraduate: '/training/project/student/notGraduate',
    notGraduateMultiple: '/training/project/student/notGraduateList'
  },
  taskTeaching: {
    query: '/task/teaching/query',
    add: '/task/teaching/add',
    updateTaskLine: '/task/teaching/update',
    upgradeTaskLine: '/task/teaching/upgrade',
    queryDetail: '/task/teaching/detail',
    publish: '/task/teaching/publish',
    deleteOne: '/task/teaching/delete',
    deleteMultiple: '/task/teaching/deleteList',
    subordinate: '/task/teaching/subordinate/query',
    subordinateDetail: '/task/teaching/subordinate/detail',
    tutors: '/task/teaching/tutors/query',
    studentDetail: '/task/teaching/students/detail',
    studentTaskDetail: '/task/teaching/studentTask/detail',
    position: '/task/teaching/position/query'
  },
  learningMap: {
    queryByPage: '/learningMap/queryByPage',
    position: '/learningMap/position/query',
    add: '/learningMap/add',
    mapDetail: '/learningMap/detail',
    update: '/learningMap/update',
    queryAllStage: '/learningMap/stage/queryAll',
    publish: '/learningMap/publish',
    statistic: '/learningMap/statistic/queryByPage',
    upgrade: '/learningMap/upgrade',
    deleteOne: '/learningMap/delete',
    orgLeve1: '/learningMap/orgLeve1/findAll',
    orgLeve2: '/learningMap/orgLeve2/findAll',
    mapTree: '/learningMap/stage/tree',
    stageCourse: '/learningMap/stage/course'
  },
  manager: {
    query: '/admin/query',
    search: '/admin/search',
    allNotAdminUser: '/user/allNotAdminUser',
    addInSystem: '/admin/add',
    addNotInSystem: '/admin/addUserAndSetToAdmin',
    deleteOne: '/admin/delete',
    deleteMultiple: '/admin/deleteList',
    update: '/admin/update'
  },
  // 车辆维修接口
  repair: {
    add: 'repair/add',
    update: 'repair/update',
    selectAll: 'repair/selectAll',
    selectById: 'repair/selectById',
    delete: 'repair/delete',
    deleteList: 'repair/deleteList',
    options: 'repair/options'
  },
  uploadFile: {
    selectAll: 'uploadFile/selectAll'
  },
  // 通用接口
  common: {
    vChatUserInfo: 'common/vChatUserInfo',
    estimateDriving: 'common/estimateDriving',
    yuanPerKm: 'common/yuanPerKm',
    addOrder: 'common/addOrder',
    addRoundOrder: 'common/addRoundOrder'
  },

  // 按摩预订
  massage: {
    cancelOrder: 'massage/order/cancel',
    selectAllOrder: 'massage/order/selectAll',
    selectOrder: 'massage/order/selectById',
    updateOrder: 'massage/order/update',
    addService: 'massage/service/add',
    deleteService: 'massage/service/delete',
    selectAllService: 'massage/service/selectAll',
    selectLastService: 'massage/service/selectLastOne',
    selectService: 'massage/service/selectById',
    updateService: 'massage/service/update',
    selectOrderByServiceId: 'massage/order/selectByServiceId',
    selectQueueByServiceId: 'massage/queue/selectByServiceId'
  },

  home: 'home'
}

export default Url
