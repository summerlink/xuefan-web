export const locationLabels: Record<string, string> = {
  selangor: "雪兰莪",
  johor: "柔佛",
  penang: "槟城",
  kuala_lumpur: "吉隆坡",
  kuching: "古晋",
  sarawak: "砂拉越",
  perak: "霹雳",
}

export const levelLabels: Record<string, string> = {
  foundation: "预科",
  diploma: "专科",
  degree: "本科",
  master: "硕士",
  phd: "博士",
  certificate: "证书",
}

export const intakeLabels: Record<string, string> = {
  "1": "1月",
  "2": "2月",
  "3": "3月",
  "4": "4月",
  "5": "5月",
  "6": "6月",
  "7": "7月",
  "8": "8月",
  "9": "9月",
  "10": "10月",
  "11": "11月",
  "12": "12月",
}

export interface University {
  id: number
  name: string
}
