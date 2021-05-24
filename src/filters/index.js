/**
 * 数字转换成字母
 * @param num
 * @returns {string}
 */
export function convert(num) {
  return num <= 26 ? String.fromCharCode(num + 64) : convert(~~((num - 1) / 26)) + convert(num % 26 || 26)
}

/**
 * 将试卷类型转换为中文
 * @param type
 * @returns {string}
 */
export function convertTestPaperTypeToTitle(type) {
  let title = ''
  if (type === 'training') {
    title = '日常练习'
  } else if (type === 'mock') {
    title = '模拟考试'
  } else if (type === 'formal') {
    title = '正式考试'
  }
  return title
}

/**
 * 将题型转换为中文
 * @param type
 * @returns {string}
 */
export function convertQuestionTypeToTitle(type) {
  let title = ''
  if (type === 'choice') {
    title = '单选题'
  } else if (type === 'choice_multi') {
    title = '多选题'
  } else if (type === 'true_false') {
    title = '判断题'
  } else if (type === 'fill_blank') {
    title = '填空题'
  } else if (type === 'question') {
    title = '问答题'
  }
  return title
}

/**
 * 将答案转换成中文
 * @param answer
 * @param type
 * @returns {string}
 */
export function convertQuestionAnswer(answer, type) {
  let result = ''
  if (type === 'choice') {
    result = convertQuestionAnswerForChoice(answer)
  } else if (type === 'choice_multi') {
    result = convertQuestionAnswerForChoiceMulti(answer)
  } else if (type === 'true_false') {
    result = convertQuestionAnswerForTrueFalse(answer)
  } else if (type === 'fill_blank') {
    result = convertQuestionAnswerForFillBlank(answer)
  } else if (type === 'question') {
    result = answer
  }
  return result
}

/**
 * 将单选题答案转换成中文
 * @param answer
 * @returns {string}
 */
function convertQuestionAnswerForChoice(answer) {
  const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  return arr[answer]
}

/**
 * 将多选题答案转换成中文
 * @param answer
 * @returns {string}
 */
function convertQuestionAnswerForChoiceMulti(answer) {
  let result = ''
  const answerArr = JSON.parse(answer)
  answerArr.forEach((value, index) => {
    if (index === answerArr.length - 1) {
      result += convertQuestionAnswerForChoice(value)
    } else {
      result += convertQuestionAnswerForChoice(value) + '、'
    }
  })
  return result
}

/**
 * 将判断题答案转换成中文
 * @param answer
 * @returns {string}
 */
function convertQuestionAnswerForTrueFalse(answer) {
  const arr = ['正确', '错误']
  return arr[answer]
}

/**
 * 将填空题答案转换成中文
 * @param answer
 * @returns {string}
 */
function convertQuestionAnswerForFillBlank(answer) {
  let result = ''
  const answerArr = JSON.parse(answer)
  answerArr.forEach((value, index) => {
    if (index === answerArr.length - 1) {
      result += value
    } else {
      result += value + ' '
    }
  })
  return result
}
