export function convert(num) {
  return num <= 26 ? String.fromCharCode(num + 64) : convert(~~((num - 1) / 26)) + convert(num % 26 || 26)
}

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
