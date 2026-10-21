import type { DisplayFormatMode, KoreanTrackMeta } from "./types";

const HANGUL_REGEX = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;

export function hasHangul(text?: string | null): boolean {
	if (!text) return false;
	return HANGUL_REGEX.test(text);
}

/**
 * Built-in dictionary of popular Korean / K-Pop artists whose names are commonly
 * listed in English on TIDAL.
 */
export const KOREAN_ARTIST_DICT: Record<string, string> = {
	"iu": "아이유",
	"newjeans": "뉴진스",
	"aespa": "에스파",
	"ive": "아이브",
	"le sserafim": "르세라핌",
	"blackpink": "블랙핑크",
	"bts": "방탄소년단",
	"twice": "트와이스",
	"red velvet": "레드벨벳",
	"seventeen": "세븐틴",
	"day6": "데이식스",
	"akmu": "악뮤",
	"akdong musician": "악동뮤지션",
	"taeyeon": "태연",
	"baekhyun": "백현",
	"exo": "엑소",
	"nct": "엔시티",
	"nct 127": "엔시티 127",
	"nct dream": "엔시티 드림",
	"stray kids": "스트레이 키즈",
	"itzy": "있지",
	"nmixx": "엔믹스",
	"(g)i-dle": "(여자)아이들",
	"i-dle": "아이들",
	"stayc": "스테이씨",
	"kiss of life": "키스오브라이프",
	"illit": "아일릿",
	"babymonster": "베이비몬스터",
	"qwer": "QWER",
	"plave": "플레이브",
	"riize": "라이즈",
	"tws": "투어스",
	"zerobaseone": "제로베이스원",
	"txt": "투모로우바이투게더",
	"tomorrow x together": "투모로우바이투게더",
	"enhypen": "엔하이픈",
	"ateez": "에이티즈",
	"the boyz": "더보이즈",
	"monsta x": "몬스타엑스",
	"shinee": "샤이니",
	"super junior": "슈퍼주니어",
	"girls' generation": "소녀시대",
	"snsd": "소녀시대",
	"kara": "카라",
	"2ne1": "투애니원",
	"bigbang": "빅뱅",
	"g-dragon": "지드래곤",
	"taeyang": "태양",
	"daesung": "대성",
	"psy": "싸이",
	"zico": "지코",
	"crush": "크러쉬",
	"dean": "딘",
	"heize": "헤이즈",
	"bol4": "볼빨간사춘기",
	"bolbbalgan4": "볼빨간사춘기",
	"davichi": "다비치",
	"mamamoo": "마마무",
	"hwasa": "화사",
	"wheein": "휘인",
	"solar": "솔라",
	"moonbyul": "문별",
	"oh my girl": "오마이걸",
	"apink": "에이핑크",
	"fromis_9": "프로미스나인",
	"gfriend": "여자친구",
	"viviz": "비비지",
	"wjsn": "우주소녀",
	"loona": "이달의 소녀",
	"artms": "아르테미스",
	"tripleS": "트리플에스",
	"fifty fifty": "피프티피프티",
	"bbgirls": "브브걸",
	"brave girls": "브레이브걸스",
	"btob": "비투비",
	"highlight": "하이라이트",
	"infinite": "인피니트",
	"winner": "위너",
	"ikon": "아이콘",
	"treasure": "트레저",
	"boynextdoor": "보이넥스트도어",
	"n.flying": "엔플라잉",
	"ftisland": "FT아일랜드",
	"cnblue": "씨엔블루",
	"nell": "넬",
	"hyukoh": "혁오",
	"jannabi": "잔나비",
	"10cm": "십센치",
	"lucy": "루시",
	"silicagel": "실리카겔",
	"silica gel": "실리카겔",
	"wave to earth": "웨이브 투 어스",
	"the black skirts": "검정치마",
	"car, the garden": "카더가든",
	"paul kim": "폴킴",
	"meloMance": "멜로망스",
	"sung si kyung": "성시경",
	"park hyo shin": "박효신",
	"kim bum soo": "김범수",
	"naul": "나얼",
	"brown eyed soul": "브라운 아이드 소울",
	"epik high": "에픽하이",
	"dynamic duo": "다이나믹 듀오",
	"jay park": "박재범",
	"loco": "로꼬",
	"gray": "그레이",
	"giriboy": "기리보이",
	"changmo": "창모",
	"ash island": "애쉬 아일랜드",
	"leellamarz": "릴러말즈",
	"beenzino": "빈지노",
	"e sens": "이센스",
	"simon dominic": "사이먼 도미닉",
	"bewhy": "비와이",
	"ph-1": "pH-1",
	"big naughty": "서동현",
	"lee mujin": "이무진",
	"lim young woong": "임영웅",
	"lee chan won": "이찬원",
	"young tak": "영탁",
	"kim ho joong": "김호중",
	"song ga in": "송가인",
	"younha": "윤하",
	"lee hi": "이하이",
	"baek yerin": "백예린",
	"yerin baek": "백예린",
	"kwon jin ah": "권진아",
	"jung seung hwan": "정승환",
	"sam kim": "샘킴",
	"roy kim": "로이킴",
	"huh gak": "허각",
	"k.will": "케이윌",
	"gummy": "거미",
	"ailee": "에일리",
	"hyolyn": "효린",
	"sunmi": "선미",
	"chungha": "청하",
	"jeon somi": "전소미",
	"somi": "전소미",
	"kwon eunbi": "권은비",
	"choi yena": "최예나",
	"yena": "최예나",
	"chuu": "츄",
	"bibi": "비비",
	"lee young ji": "이영지",
	"meovv": "미야오",
	"izna": "이즈나",
	"hearts2hearts": "하츠투하츠",
	"kiiikiii": "키키",
	"rose": "로제",
	"rosé": "로제",
	"jennie": "제니",
	"lisa": "리사",
	"jisoo": "지수",
	"jung kook": "정국",
	"jungkook": "정국",
	"jimin": "지민",
	"v": "뷔",
	"suga": "슈가",
	"agust d": "어거스트 디",
	"rm": "RM",
	"jin": "진",
	"j-hope": "제이홉",
	"mark": "마크",
	"taeyong": "태용",
	"doyoung": "도영",
	"jaehyun": "재현",
	"ten": "텐",
	"kai": "카이",
	"d.o.": "디오",
	"chen": "첸",
	"suho": "수호",
	"chanyeol": "찬열",
	"taemin": "태민",
	"key": "키",
	"onew": "온유",
	"minho": "민호",
	"jonghyun": "종현",
	"boA": "보아",
	"tvxq!": "동방신기",
	"tvxq": "동방신기",
	"j.y. park": "박진영",
	"rain": "비",
	"lee hyori": "이효리",
	"uhm jung hwa": "엄정화",
	"kim kwang seok": "김광석",
	"lee moon sae": "이문세",
	"cho yong pil": "조용필",
	"seo taiji": "서태지",
	"yb": "YB",
	"buzz": "버즈",
	"m.c the max": "엠씨더맥스",
	"mc the max": "엠씨더맥스",
	"sg wannabe": "SG워너비",
	"v.o.s": "V.O.S",
	"monday kiz": "먼데이 키즈",
	"4men": "포맨",
	"noel": "노을",
	"urban zakapa": "어반자카파",
	"standing egg": "스탠딩 에그",
	"cheeze": "치즈",
	"stella jang": "스텔라장",
	"sunwoo jung-a": "선우정아",
	"ahn ye eun": "안예은",
	"lee suhyun": "이수현",
	"lee chanhyuk": "이찬혁",
	"wendy": "웬디",
	"seulgi": "슬기",
	"joy": "조이",
	"irene": "아이린",
	"yeri": "예리",
	"nayeon": "나연",
	"jihyo": "지효",
	"misamo": "미사모",
	"woodz": "우즈",
	"ha sung woon": "하성운",
	"hwang min hyun": "황민현",
	"kang daniel": "강다니엘",
	"park ji hoon": "박지훈",
	"kim jae hwan": "김재환",
	"ong seong wu": "옹성우",
	"ab6ix": "에이비식스",
	"cix": "씨아이엑스",
	"cravity": "크래비티",
	"p1harmony": "피원하모니",
	"oneus": "원어스",
	"onewe": "원위",
	"purple kiss": "퍼플키스",
	"billlie": "빌리",
	"h1-key": "하이키",
	"lightsum": "라잇썸",
	"kep1er": "케플러",
	"unis": "유니스",
	"rescence": "리센느",
	"rescene": "리센느",
	"fifty-fifty": "피프티피프티",
	"young posse": "영파씨",
	"badvillain": "배드빌런",
	"evnne": "이븐",
	"xikers": "싸이커스",
	"8turn": "에잇턴",
	"epex": "이펙스",
	"tempest": "템페스트",
	"onf": "온앤오프",
	"astro": "아스트로",
	"cha eun woo": "차은우",
	"sf9": "에스에프나인",
	"pentagon": "펜타곤",
	"hui": "후이",
	"golden child": "골든차일드",
	"verivery": "베리베리",
	"wei": "위아이",
	"dkz": "DKZ",
	"vannda": "반다",

	// === 1st & 2nd Gen K-Pop Groups & Soloists ===
	"h.o.t.": "H.O.T.",
	"sechs kies": "젝스키스",
	"sechskies": "젝스키스",
	"eun jiwon": "은지원",
	"g.o.d": "god",
	"god": "god",
	"kim tae woo": "김태우",
	"shinhwa": "신화",
	"lee min woo": "이민우",
	"shin hye sung": "신혜성",
	"jun jin": "전진",
	"fin.k.l": "핑클",
	"ook joo hyun": "옥주현",
	"ok joo hyun": "옥주현",
	"s.e.s.": "S.E.S.",
	"bada": "바다",
	"eugene": "유진",
	"baby v.o.x": "베이비복스",
	"kan mi youn": "간미연",
	"chakra": "샤크라",
	"jewelry": "쥬얼리",
	"seo in young": "서인영",
	"park jung ah": "박정아",
	"sugar": "슈가",
	"fly to the sky": "플라이 투 더 스카이",
	"hwanhee": "환희",
	"brian": "브라이언",
	"brian joo": "브라이언",
	"nrg": "NRG",
	"click-b": "클릭비",
	"1tym": "원타임",
	"jinusean": "지누션",
	"deux": "듀스",
	"kim sung jae": "김성재",
	"lee hyun do": "이현도",
	"roora": "룰라",
	"roo'ra": "룰라",
	"cool": "쿨",
	"lee jae hoon": "이재훈",
	"yuri": "유리",
	"koyote": "코요태",
	"shinji": "신지",
	"kim jong min": "김종민",
	"turbo": "터보",
	"kim jong kook": "김종국",
	"clon": "클론",
	"country kkokko": "컨츄리꼬꼬",
	"tak jae hoon": "탁재훈",
	"shin jung hwan": "신정환",
	"dj doc": "DJ DOC",
	"im chang jung": "임창정",
	"lim chang jung": "임창정",
	"solid": "솔리드",
	"kim jo han": "김조한",
	"uptown": "업타운",
	"sharp": "샵",
	"s#arp": "샵",
	"lee ji hye": "이지혜",
	"space a": "스페이스 에이",
	"wax": "왁스",
	"so chan whee": "소찬휘",
	"kim hyun jung": "김현정",
	"lee jung hyun": "이정현",
	"baek ji young": "백지영",
	"lee soo young": "이수영",
	"park hwayobi": "박화요비",
	"hwayobi": "화요비",
	"maya": "마야",
	"cherry filter": "체리필터",
	"rumble fish": "럼블피쉬",
	"loveholic": "러브홀릭",
	"jaurim": "자우림",
	"kim yuna": "김윤아",
	"roller coaster": "롤러코스터",
	"clazziquai": "클래지콰이",
	"clazziquai project": "클래지콰이",
	"horan": "호란",
	"alex": "알렉스",
	"epitone project": "에피톤 프로젝트",
	"casker": "캐스커",
	"humming urban stereo": "허밍어반스테레오",
	"wonder girls": "원더걸스",
	"ha:tfelt": "핫펠트",
	"yubin": "유빈",
	"hyuna": "현아",
	"miss a": "미쓰에이",
	"suzy": "수지",
	"bae suzy": "수지",
	"2pm": "투피엠",
	"jun. k": "준케이",
	"nichkhun": "닉쿤",
	"taecyeon": "택연",
	"wooyoung": "우영",
	"jang wooyoung": "장우영",
	"junho": "준호",
	"lee junho": "이준호",
	"2am": "투에이엠",
	"jo kwon": "조권",
	"changmin": "창민",
	"lee changmin": "이창민",
	"seulong": "슬옹",
	"im seulong": "임슬옹",
	"jeong jinwoon": "정진운",
	"f(x)": "에프엑스",
	"amber": "엠버",
	"luna": "루나",
	"krystal": "크리스탈",
	"brown eyed girls": "브라운아이드걸스",
	"jea": "제아",
	"narsha": "나르샤",
	"gain": "가인",
	"t-ara": "티아라",
	"jiyeon": "지연",
	"hyomin": "효민",
	"eunjung": "은정",
	"after school": "애프터스쿨",
	"orange caramel": "오렌지캬라멜",
	"raina": "레이나",
	"kahi": "가희",
	"sistar": "씨스타",
	"sistar19": "씨스타19",
	"soyou": "소유",
	"bora": "보라",
	"dasom": "다솜",
	"girl's day": "걸스데이",
	"minah": "민아",
	"bang minah": "방민아",
	"hyeri": "혜리",
	"sojin": "소진",
	"aoa": "에이오에이",
	"choa": "초아",
	"seolhyun": "설현",
	"exid": "이엑스아이디",
	"solji": "솔지",
	"hani": "하니",
	"le": "엘리",
	"secret": "시크릿",
	"jun hyo seong": "전효성",
	"song ji eun": "송지은",
	"4minute": "포미닛",
	"jeon jiyoon": "전지윤",
	"heo gayoon": "허가윤",
	"rainbow": "레인보우",
	"nine muses": "나인뮤지스",
	"9muses": "나인뮤지스",
	"dalshabet": "달샤벳",
	"stellar": "스텔라",
	"fiestar": "피에스타",
	"hello venus": "헬로비너스",
	"spica": "스피카",
	"kim bohyung": "김보형",
	"kim boa": "김보아",
	"ladies' code": "레이디스 코드",
	"ashley": "애슐리",
	"sojung": "소정",
	"lee sojung": "이소정",
	"crayon pop": "크레용팝",
	"sonamoo": "소나무",
	"laboum": "라붐",
	"clc": "씨엘씨",
	"yeeun": "예은",
	"sorn": "손",
	"ss501": "SS501",
	"kim hyun joong": "김현중",
	"heo young saeng": "허영생",
	"kim kyu jong": "김규종",
	"park jung min": "박정민",
	"kim hyung jun": "김형준",
	"jyj": "JYJ",
	"kim jaejoong": "김재중",
	"jaejoong": "김재중",
	"xia": "시아",
	"kim junsu": "김준수",
	"junsu": "김준수",
	"max changmin": "최강창민",
	"u-know": "유노윤호",
	"yunho": "윤호",
	"kyuhyun": "규현",
	"ryeowook": "려욱",
	"yesung": "예성",
	"heechul": "희철",
	"kim heechul": "김희철",
	"leeteuk": "이특",
	"donghae": "동해",
	"eunhyuk": "은혁",
	"super junior-d&e": "슈퍼주니어-D&E",
	"super junior-k.r.y.": "슈퍼주니어-K.R.Y.",
	"henry": "헨리",
	"zhoumi": "조미",
	"mblaq": "엠블랙",
	"g.o": "지오",
	"mir": "미르",
	"beast": "비스트",
	"b2st": "비스트",
	"yang yoseob": "양요섭",
	"yoseob": "양요섭",
	"lee gikwang": "이기광",
	"gikwang": "이기광",
	"son dongwoon": "손동운",
	"yong junhyung": "용준형",
	"jang hyunseung": "장현승",
	"kim sungkyu": "김성규",
	"sungkyu": "김성규",
	"nam woohyun": "남우현",
	"woohyun": "우현",
	"lee sungyeol": "이성열",
	"l": "엘",
	"kim myungsoo": "김명수",
	"teen top": "틴탑",
	"niel": "니엘",
	"chunji": "천지",
	"b1a4": "비원에이포",
	"sandeul": "산들",
	"cnu": "신우",
	"jinyoung": "진영",
	"baro": "바로",
	"block b": "블락비",
	"block b bastarz": "블락비 바스타즈",
	"p.o": "피오",
	"taeil": "태일",
	"ukwon": "유권",
	"b-bomb": "비범",
	"jaehyo": "재효",
	"park kyung": "박경",
	"vixx": "빅스",
	"vixx lr": "빅스 LR",
	"leo": "레오",
	"ken": "켄",
	"ravi": "라비",
	"n": "엔",
	"hyuk": "혁",
	"b.a.p": "비에이피",
	"bang yongguk": "방용국",
	"daehyun": "대현",
	"jung daehyun": "정대현",
	"youngjae": "영재",
	"yoo youngjae": "유영재",
	"jongup": "종업",
	"moon jongup": "문종업",
	"zelo": "젤로",
	"boyfriend": "보이프렌드",
	"ze:a": "제국의아이들",
	"im siwan": "임시완",
	"park hyung sik": "박형식",
	"hwang kwanghee": "황광희",
	"kim dong jun": "김동준",
	"u-kiss": "유키스",
	"soohyun": "수현",
	"ukiss": "유키스",
	"myname": "마이네임",
	"100%": "백퍼센트",
	"history": "히스토리",
	"speed": "스피드",
	"c-clown": "씨클라운",
	"nu'est": "뉴이스트",
	"nu'est w": "뉴이스트 W",
	"baekho": "백호",
	"ren": "렌",
	"jr": "JR",
	"aron": "아론",

	// === 3rd / 4th / 5th Gen K-Pop Groups, Sub-units & Soloists ===
	"got7": "갓세븐",
	"jay b": "제이비",
	"jb": "제이비",
	"mark tuan": "마크",
	"jackson wang": "잭슨",
	"park jinyoung": "박진영",
	"choi youngjae": "최영재",
	"bambam": "뱀뱀",
	"yugyeom": "유겸",
	"jus2": "저스투",
	"jj project": "JJ 프로젝트",
	"day6 (even of day)": "데이식스 (이븐 오브 데이)",
	"young k": "영케이",
	"wonpil": "원필",
	"dowoon": "도운",
	"eaJ": "제이",
	"xdinary heroes": "엑스디너리 히어로즈",
	"nexz": "넥스지",
	"kickflip": "킥플립",
	"niziu": "니쥬",
	"vcha": "비춰",
	"exo-cbx": "엑소-첸백시",
	"exo-sc": "엑소-세훈&찬열",
	"xiumin": "시우민",
	"lay": "레이",
	"sehun": "세훈",
	"red velvet - irene & seulgi": "레드벨벳-아이린&슬기",
	"got the beat": "갓 더 비트",
	"girls on top": "걸스 온 탑",
	"superm": "슈퍼엠",
	"wayv": "웨이션브이",
	"nct u": "엔시티 유",
	"nct dojaejung": "엔시티 도재정",
	"nct wish": "엔시티 위시",
	"taeil (nct)": "태일",
	"johnny": "쟈니",
	"yuta": "유타",
	"kun": "쿤",
	"winwin": "윈윈",
	"jungwoo": "정우",
	"lucas": "루카스",
	"xiaojun": "샤오쥔",
	"hendery": "헨데리",
	"renjun": "런쥔",
	"jeno": "제노",
	"haechan": "해찬",
	"jaemin": "재민",
	"yangyang": "양양",
	"shotaro": "쇼타로",
	"sungchan": "성찬",
	"chenle": "천러",
	"jisung": "지성",
	"sion": "시온",
	"riku": "리쿠",
	"yushi": "유우시",
	"jaehee": "재희",
	"ryo": "료",
	"sakuya": "사쿠야",
	"bss": "부석순",
	"jxw": "정한X원우",
	"s.coups": "에스쿱스",
	"jeonghan": "정한",
	"joshua": "조슈아",
	"jun": "준",
	"hoshi": "호시",
	"wonwoo": "원우",
	"woozi": "우지",
	"the8": "디에잇",
	"mingyu": "민규",
	"dk": "도겸",
	"seungkwan": "승관",
	"vernon": "버논",
	"dino": "디노",
	"shownu": "셔누",
	"minhyuk": "민혁",
	"kihyun": "기현",
	"hyungwon": "형원",
	"joohoney": "주헌",
	"i.m": "아이엠",
	"shownu x hyungwon": "셔누X형원",
	"wonho": "원호",
	"eunkwang": "서은광",
	"seo eunkwang": "서은광",
	"lee minhyuk": "이민혁",
	"lee changsub": "이창섭",
	"changsub": "이창섭",
	"im hyunsik": "임현식",
	"hyunsik": "임현식",
	"peniel": "프니엘",
	"yook sungjae": "육성재",
	"sungjae": "육성재",
	"btob 4u": "비투비 포유",
	"btob-blue": "비투비-블루",
	"kang seung yoon": "강승윤",
	"seungyoon": "강승윤",
	"mino": "송민호",
	"song mino": "송민호",
	"kim jin woo": "김진우",
	"lee seung hoon": "이승훈",
	"b.i": "비아이",
	"bobby": "바비",
	"jinhwan": "김진환",
	"jay": "김진환",
	"ju-ne": "구준회",
	"koo junhoe": "구준회",
	"yunhyeong": "송윤형",
	"donghyuk": "김동혁",
	"chanwoo": "정찬우",
	"cl": "씨엘",
	"sandara park": "산다라박",
	"dara": "산다라박",
	"park bom": "박봄",
	"minzy": "공민지",
	"gd & top": "GD&TOP",
	"gd x taeyang": "GD X 태양",
	"t.o.p": "탑",
	"seungri": "승리",
	"wanna one": "워너원",
	"lai kuanlin": "라이관린",
	"park woo jin": "박우진",
	"lee dae hwi": "이대휘",
	"bae jin young": "배진영",
	"yoon ji sung": "윤지성",
	"iz*one": "아이즈원",
	"izone": "아이즈원",
	"jang wonyoung": "장원영",
	"an yujin": "안유진",
	"kim chaewon": "김채원",
	"sakura": "사쿠라",
	"huh yunjin": "허윤진",
	"kazuha": "카즈하",
	"hong eunchae": "홍은채",
	"jo yuri": "조유리",
	"kang hyewon": "강혜원",
	"lee chaeyeon": "이채연",
	"kim minju": "김민주",
	"yabuki nako": "야부키 나코",
	"honda hitomi": "혼다 히토미",
	"i.o.i": "아이오아이",
	"ioi": "아이오아이",
	"kim sejeong": "김세정",
	"sejeong": "김세정",
	"mina": "미나",
	"kang mina": "강미나",
	"chaeyeon": "정채연",
	"jung chaeyeon": "정채연",
	"yoo yeonjung": "유연정",
	"kim doyeon": "김도연",
	"choi yoojung": "최유정",
	"kim sohye": "김소혜",
	"im nayoung": "임나영",
	"kyulkyung": "주결경",
	"x1": "엑스원",
	"kim wooseok": "김우석",
	"han seungwoo": "한승우",
	"cho seungyoun": "조승연",
	"kim yohan": "김요한",
	"lee hangyul": "이한결",
	"cha junho": "차준호",
	"son dongpyo": "손동표",
	"kang minhee": "강민희",
	"lee eunsang": "이은상",
	"song hyeongjun": "송형준",
	"nam dohyon": "남도현",
	"lovelyz": "러블리즈",
	"kei": "케이",
	"ryu sujeong": "류수정",
	"jeong yein": "정예인",
	"lee mijoo": "이미주",
	"mijoo": "미주",
	"baby soul": "베이비소울",
	"lee sujeong": "이수정",
	"yoo jiae": "유지애",
	"seo jisoo": "서지수",
	"jin (lovelyz)": "진",
	"dreamcatcher": "드림캐쳐",
	"jiu": "지유",
	"sua": "수아",
	"siyeon": "시연",
	"handong": "한동",
	"yoohyeon": "유현",
	"dami": "다미",
	"gahyeon": "가현",
	"momoland": "모모랜드",
	"weki meki": "위키미키",
	"gugudan": "구구단",
	"pristin": "프리스틴",
	"pristin v": "프리스틴 V",
	"dia": "다이아",
	"april": "에이프릴",
	"uni.t": "유니티",
	"unb": "유앤비",
	"jbj": "JBJ",
	"jbj95": "JBJ95",
	"kenta": "켄타",
	"kim sanggyun": "김상균",
	"noh taehyun": "노태현",
	"kwon hyunbin": "권현빈",
	"viini": "비니",
	"kim donghan": "김동한",
	"rainz": "레인즈",
	"1the9": "원더나인",
	"bae173": "BAE173",
	"mcnD": "MCND",
	"dkb": "다크비",
	"drippin": "드리핀",
	"ghost9": "고스트나인",
	"mirae": "미래소년",
	"ciipher": "싸이퍼",
	"omega x": "오메가엑스",
	"just b": "저스트비",
	"luminous": "루미너스",
	"blitzers": "블리처스",
	"kingdom": "킹덤",
	"the kingdom": "더킹덤",
	"e'last": "엘라스트",
	"elast": "엘라스트",
	"bdc": "BDC",
	"vanner": "배너",
	"sevenus": "세븐어스",
	"mont": "몬트",
	"m.o.n.t": "몬트",
	"ntx": "엔티엑스",
	"24k+": "투포케이플러스",
	"atbo": "ATBO",
	"youNite": "유나이트",
	"tnx": "더뉴식스",
	"the new six": "더뉴식스",
	"csr": "첫사랑",
	"class:y": "클라씨",
	"classy": "클라씨",
	"ily:1": "아일리원",
	"lapillus": "라필루스",
	"mimiirose": "미미로즈",
	"limelight": "라임라잇",
	"madein": "메이딘",
	"secret number": "시크릿넘버",
	"woo!ah!": "우아!",
	"wooah": "우아",
	"weeekly": "위클리",
	"everglow": "에버글로우",
	"cherry bullet": "체리블렛",
	"rocket punch": "로켓펀치",
	"bvndit": "밴디트",
	"cignature": "시그니처",
	"nature": "네이처",
	"gwsn": "공원소녀",
	"saturday": "세러데이",
	"dreamnote": "드림노트",
	"pinkfantasy": "핑크판타지",
	"pixy": "픽시",
	"tri.be": "트라이비",
	"ichillin'": "아이칠린",
	"bugAboo": "버가부",
	"hot issue": "핫이슈",
	"majors": "메이져스",
	"elris": "엘리스",
	"alice": "앨리스",
	"berry good": "베리굿",
	"johyun": "조현",
	"kard": "카드",
	"bm": "비엠",
	"j.seph": "제이셉",
	"somin": "전소민",
	"jiwoo": "전지우",
	"ace": "에이스",
	"a.c.e": "에이스",
	"victon": "빅톤",
	"seungsik": "강승식",
	"subin": "정수빈",
	"up10tion": "업텐션",
	"lee jinhyuk": "이진혁",
	"knk": "크나큰",
	"imfact": "임팩트",
	"map6": "맵식스",
	"romeo": "로미오",
	"snuper": "스누퍼",
	"halo": "헤일로",
	"toppdogg": "탑독",
	"xeno-t": "제노티",
	"cross gene": "크로스진",
	"bigflo": "빅플로",
	"boys republic": "소년공화국",
	"madclown": "매드클라운",
	"mad clown": "매드클라운",
	"san e": "산이",
	"verbal jint": "버벌진트",
	"bumkey": "범키",
	"troy": "트로이",
	"phantom": "팬텀",
	"hanhae": "한해",
	"sanchez": "산체스",
	"microdot": "마이크로닷",
	"sleeq": "슬릭",
	"cheetah": "치타",
	"jessi": "제시",
	"kisum": "키썸",
	"giant pink": "자이언트핑크",
	"nada": "나다",
	"truedy": "트루디",
	"yuk jidam": "육지담",
	"mirani": "미란이",
	"ash-b": "애쉬비",
	"camo": "카모",
	"sogumm": "소금",
	"meenoI": "미노이",
	"deVita": "드비타",
	"hoody": "후디",
	"elo": "엘로",
	"ugly duck": "어글리덕",
	"punchnello": "펀치넬로",
	"woo": "우원재",
	"woo won jae": "우원재",
	"code kunst": "코드 쿤스트",
	"coogie": "쿠기",
	"sik-k": "식케이",
	"haon": "김하온",
	"kim haon": "김하온",
	"woodie gochild": "우디 고차일드",
	"trade l": "트레이드 엘",
	"jayb": "제이비",
	"gemini": "제미나이",
	"paul blanco": "폴 블랑코",
	"homies": "호미들",
	"uneducated kid": "언에듀케이티드 키드",
	"superbee": "수퍼비",
	"twlv": "트웰브",
	"hash swan": "해쉬스완",
	"keem hyoeun": "김효은",
	"the quiett": "더콰이엇",
	"dok2": "도끼",
	"illionaire": "일리네어",
	"ambition musik": "앰비션 뮤직",
	"way ched": "웨이체드",
	"toil": "토일",
	"skinny brown": "스키니 브라운",
	"gist": "지스트",
	"jayci yucca": "제이씨 유카",
	"pateko": "파테코",
	"kid wine": "키드와인",
	"relamarz": "릴러말즈",
	"swings": "스윙스",
	"justhis": "저스디스",
	"kid milli": "키드밀리",
	"young b": "영비",
	"yang hongwon": "양홍원",
	"no:el": "노엘",
	"jvcki wai": "재키와이",
	"han yo han": "한요한",
	"black nut": "블랙넛",
	"c jamm": "씨잼",
	"cjamm": "씨잼",
	"vasco": "바스코",
	"bill stax": "빌스택스",
	"nafla": "나플라",
	"loopy": "루피",
	"bloo": "블루",
	"owen": "오왼",
	"paloalto": "팔로알토",
	"huckleberry p": "허클베리피",
	"reddy": "레디",
	"g2": "지투",
	"sway d": "스웨이디",
	"yunb": "윤비",
	"nucksal": "넉살",
	"don mills": "던밀스",
	"deepflow": "딥플로우",
	"wutan": "우탄",
	"odee": "오디",
	"qm": "큐엠",
	"Rohann": "이로한",
	"be'o": "비오",
	"beo": "비오",
	"mudd the student": "머드 더 스튜던트",
	"sokodomo": "소코도모",
	"khundi panda": "쿤디판다",
	"wonstein": "원슈타인",
	"lilboi": "릴보이",
	"mushvenom": "머쉬베놈",
	"jo gwangil": "조광일",
	"since": "신스",
	"tabber": "태버",
	"rad museum": "라드 뮤지엄",
	"miso": "미소",
	"offonoff": "오프온오프",
	"colde": "콜드",
	"0wave": "영웨이브",
	"penomeco": "페노메코",
	"millic": "밀릭",
	"zion.t": "자이언티",
	"zion t": "자이언티",
	"primary": "프라이머리",
	"gaeko": "개코",
	"choiza": "최자",
	"amoebaculture": "아메바컬쳐",
	"leessang": "리쌍",
	"gary": "개리",
	"gil": "길",
	"drunken tiger": "드렁큰 타이거",
	"tiger jk": "타이거 JK",
	"yoon mirae": "윤미래",
	"t yoonmirae": "윤미래",
	"bizzy": "비지",
	"mfbty": "MFBTY",
	"tablo": "타블로",
	"mithra jin": "미쓰라진",
	"dj tukutz": "DJ 투컷",
	"mc mong": "MC몽",
	"outsider": "아웃사이더",
	"defconn": "데프콘",
	"hyungdon and daejoon": "형돈이와 대준이",
	"uv": "UV",
	"muzIe": "뮤지",
	"norazo": "노라조",

	// === K-Ballad / R&B / OST / Singer-Songwriters ===
	"lee seung chul": "이승철",
	"shin seung hun": "신승훈",
	"kim gun mo": "김건모",
	"yIm jae beum": "임재범",
	"yim jae beom": "임재범",
	"im jae bum": "임재범",
	"lee juck": "이적",
	"panic": "패닉",
	"carnival": "카니발",
	"kim dong ryul": "김동률",
	"exhibition": "전람회",
	"verandah project": "베란다 프로젝트",
	"toy": "토이",
	"yoo hee yeol": "유희열",
	"yoon jong shin": "윤종신",
	"015b": "공일오비",
	"yoon sang": "윤상",
	"lee so ra": "이소라",
	"lena park": "박정현",
	"park jung hyun": "박정현",
	"kim yeon woo": "김연우",
	"yoon do hyun": "윤도현",
	"kim kyung ho": "김경호",
	"park wan kyu": "박완규",
	"kim jong seo": "김종서",
	"boohwal": "부활",
	"lee seung hwan": "이승환",
	"shin hae chul": "신해철",
	"n.ex.t": "넥스트",
	"kim jang hoon": "김장훈",
	"wheesung": "휘성",
	"realslow": "휘성",
	"se7en": "세븐",
	"tei": "테이",
	"min kyung hoon": "민경훈",
	"isu": "이수",
	"lee su": "이수",
	"kim jin ho": "김진호",
	"lee seok hoon": "이석훈",
	"kim yong jun": "김용준",
	"ha dong qn": "하동균",
	"ha dong균": "하동균",
	"wanted": "원티드",
	"vibe": "바이브",
	"yoon min soo": "윤민수",
	"ryu jae hyun": "류재현",
	"shin yong jae": "신용재",
	"kim won joo": "김원주",
	"2f": "2F",
	"ben": "벤",
	"lyn": "린",
	"ali": "알리",
	"sohyang": "소향",
	"bmK": "BMK",
	"insooni": "인순이",
	"lee sun hee": "이선희",
	"yang hee eun": "양희은",
	"lee seung gi": "이승기",
	"seo in guk": "서인국",
	"park bo gum": "박보검",
	"jo jung suk": "조정석",
	"jeon mi do": "전미도",
	"jung joon il": "정준일",
	"mate": "메이트",
	"kim feel": "김필",
	"kvsh": "캐시",
	"kassy": "케이시",
	"punch": "펀치",
	"hynn": "박혜원",
	"park hye won": "박혜원",
	"song ha ye": "송하예",
	"lee ye joon": "이예준",
	"lim han byul": "임한별",
	"onestar": "임한별",
	"gyeongseo": "경서",
	"kyoungseo": "경서",
	"kyoungSeoYeji": "경서예지",
	"jeon gunho": "전건호",
	"woody": "우디",
	"hwang garam": "황가람",
	"soonsoonhee": "순순희",
	"vos": "V.O.S",
	"park ji heon": "박지헌",
	"choi hyun joon": "최현준",
	"kim kyung rok": "김경록",
	"december": "디셈버",
	"dk (december)": "디케이",
	"zia": "지아",
	"seeya": "씨야",
	"nam gyu ri": "남규리",
	"kim yeon ji": "김연지",
	"lee bo ram": "이보람",
	"WSG wannabe": "WSG워너비",
	"msg wannabe": "MSG워너비",
	"gaya-g": "가야G",
	"boramiyu": "보라미유",
	"sole": "쏠",
	"thama": "따마",
	"george": "죠지",
	"jeebanoff": "지바노프",
	"sumin": "수민",
	"slom": "슬롬",
	"peejay": "피제이",
	"dress": "드레스",
	"cosmic boy": "코스믹 보이",
	"fisherman": "피셔맨",
	"seori": "서리",
	"leebada": "이바다",
	"oceanfromtheblue": "오션프롬더블루",
	"junny": "주니",
	"g.soul": "지소울",
	"golden": "골든",
	"chancellor": "챈슬러",
	"babylon": "베이빌론",
	"moon sujin": "문수진",
	"suran": "수란",
	"esna": "에스나",
	"eddy kim": "에디킴",
	"parc jae jung": "박재정",
	"park jae jung": "박재정",
	"jeong sewoon": "정세운",
	"yoo seung woo": "유승우",
	"yu seung woo": "유승우",
	"brother su": "브라더수",
	"junggigo": "정기고",
	"kwill": "케이윌",
	"2bic": "투빅",
	"ulala session": "울랄라세션",
	"busker busker": "버스커 버스커",
	"jang beom june": "장범준",
	"john park": "존박",
	"dickpunks": "딕펑스",
	"hong dae kwang": "홍대광",
	"kim ye rim": "김예림",
	"lim kim": "림킴",
	"togeworl": "투개월",
	"baek a yeon": "백아연",
	"park ji min": "박지민",
	"jamie": "제이미",
	"15&": "피프틴앤드",
	"bernard park": "버나드 박",
	"katie": "케이티",
	"lee jin ah": "이진아",
	"park won": "박원",
	"one more chance": "원모어찬스",
	"jeong jae hyung": "정재형",
	"lucid fall": "루시드폴",
	"peppertones": "페퍼톤스",
	"jukjae": "적재",
	"choi yu ree": "최유리",
	"so soo bin": "소수빈",
	"kim soo young": "김수영",
	"heo hoy kyung": "허회경",
	"dori": "도리",
	"dept": "뎁트",
	"rocco": "로코",
	"rocopunCh": "로코베리",
	"rocoberry": "로코베리",
	"shaun": "숀",
	"ovAn": "오반",
	"vinxen": "빈첸",
	"nilo": "닐로",
	"jang deok cheol": "장덕철",
	"gilgu bonggu": "길구봉구",
	"gb9": "길구봉구",
	"jeong 동하": "정동하",
	"jung dong ha": "정동하",
	"soohyun (akmu)": "이수현",
	"hoppipolla": "호피폴라",
	"ha hyun sang": "하현상",
	"i'll": "아일",

	// === K-Indie / Band / Rock / Folk ===
	"guckkasten": "국카스텐",
	"ha hyun woo": "하현우",
	"crying nut": "크라잉넛",
	"no brain": "노브레인",
	"lazybone": "레이지본",
	"delispice": "델리스파이스",
	"sister's barbershop": "언니네 이발관",
	"broccoli, you too?": "브로콜리너마저",
	"kiha & the faces": "장기하와 얼굴들",
	"chang kiha": "장기하",
	"ohhyuk": "오혁",
	"se so neon": "새소년",
	"so!yoon!": "황소윤",
	"thornapple": "쏜애플",
	"nerd connection": "너드커넥션",
	"touched": "터치드",
	"band nah": "나상현씨밴드",
	"daybreak": "데이브레이크",
	"soran": "소란",
	"dear cloud": "디어클라우드",
	"monni": "몽니",
	"romantic punch": "로맨틱펀치",
	"glen check": "글렌체크",
	"idiotape": "이디오테잎",
	"adoy": "아도이",
	"surl": "설",
	"lacuna": "라쿠나",
	"the poles": "더 폴스",
	"hanroro": "한로로",
	"yudabinband": "유다빈밴드",
	"dragon pony": "드래곤포니",
	"kardi": "카디",
	"forestella": "포레스텔라",
	"la poem": "라포엠",
	"libelante": "리베란테",
	"fortena": "포르테나",
	"forte di quattro": "포르테 디 콰트로",
	"okdal": "옥상달빛",
	"rooftop moonlight": "옥상달빛",
	"j rabbit": "제이레빗",
	"vanilla acoustic": "바닐라 어쿠스틱",
	"sweden laundry": "스웨덴세탁소",
	"the ade": "디에이드",
	"acoustic collabo": "어쿠스틱 콜라보",
	"kwon jung yeol": "권정열",
	"o3ohn": "오존",
	"cloud": "구름",
	"baek hyun jin": "백현진",
	"leenalchi": "이날치",
	"chs": "CHS",
	"cadejo": "까데호",
	"sultan of the disco": "술탄 오브 더 디스코",
	"Kingston rudieska": "킹스턴 루디스카",

	// === Legends / 7080 / Folk / Trot ===
	"sanullim": "산울림",
	"kim chang wan": "김창완",
	"songgolmae": "송골매",
	"bae chul soo": "배철수",
	"deulgukhwa": "들국화",
	"jeon in kwon": "전인권",
	"sinawi": "시나위",
	"baekdoosan": "백두산",
	"kim hyun sik": "김현식",
	"yoo jae ha": "유재하",
	"byun jin sub": "변진섭",
	"dongmulwon": "동물원",
	"park hak ki": "박학기",
	"kim min ki": "김민기",
	"han dae soo": "한대수",
	"cho dong jin": "조동진",
	"lee jang hee": "이장희",
	"song chang sik": "송창식",
	"twin folio": "트윈폴리오",
	"ceci bon": "세시봉",
	"na hoon-a": "나훈아",
	"na hoon a": "나훈아",
	"nam jin": "남진",
	"seol undo": "설운도",
	"tae jin ah": "태진아",
	"song dae kwan": "송대관",
	"hyun chul": "현철",
	"joo hyun mi": "주현미",
	"sim soo bong": "심수봉",
	"kim yeon ja": "김연자",
	"jang yoon jeong": "장윤정",
	"hong jin young": "홍진영",
	"park hyun bin": "박현빈",
	"wink": "윙크",
	"jeong dong won": "정동원",
	"jang min ho": "장민호",
	"kim hee jae": "김희재",
	"park seo jin": "박서진",
	"park ji hyun": "박지현",
	"ahn sung hoon": "안성훈",
	"jin hae sung": "진해성",
	"son tae jin": "손태진",
	"enoch": "에녹",
	"shin yu": "신유",
	"jeon yu jin": "전유진",
	"mai jin": "마이진",
	"kim da hyun": "김다현",

	// === Newer 4th/5th Gen & Virtual / Indie Soloists ===
	"katseye": "캣츠아이",
	"say my name": "세이마이네임",
	"close your eyes": "클로즈 유어 아이즈",
	"nouera": "누에라",
	"all(h)ours": "올아워즈",
	"allhours": "올아워즈",
	"ampErs&one": "앰퍼샌드원",
	"lun8": "루네이트",
	"pow": "파우",
	"tiot": "티아이오티",
	"fantasy boys": "판타지 보이즈",
	"n.ssign": "엔싸인",
	"nssign": "엔싸인",
	"one pact": "원팩트",
	"whib": "휘브",
	"dxmon": "다이몬",
	"nowadays": "나우어데이즈",
	"stellive": "스텔라이브",
	"isedol": "이세계아이돌",
	"isekai idol": "이세계아이돌",
	"hebi": "헤비"
};

export function lookupArtistDict(artistName?: string | null): string | null {
	if (!artistName) return null;
	if (hasHangul(artistName)) return artistName;

	// Handle multiple artists separated by comma or "&"
	const parts = artistName.split(/\s*(?:,|&|feat\.|ft\.)\s*/i);
	let matchedAny = false;
	const translatedParts = parts.map((part) => {
		const key = part.trim().toLowerCase();
		if (KOREAN_ARTIST_DICT[key]) {
			matchedAny = true;
			return KOREAN_ARTIST_DICT[key];
		}
		return part.trim();
	});

	if (matchedAny) {
		return translatedParts.join(", ");
	}
	return null;
}

/**
 * Reverse lookup: given a Korean artist name (or "DAY6(데이식스)"), returns the English artist name
 */
export function lookupEnglishArtistName(koOrMixedArtist?: string | null): string | null {
	if (!koOrMixedArtist) return null;
	const parenMatch = koOrMixedArtist.match(/^([A-Za-z0-9\s.&'-]+)\((.+?)\)$/) || koOrMixedArtist.match(/^(.+?)\(([A-Za-z0-9\s.&'-]+)\)$/);
	if (parenMatch) {
		const p1 = parenMatch[1].trim();
		const p2 = parenMatch[2].trim();
		if (!hasHangul(p1) && p1.length > 0) return p1;
		if (!hasHangul(p2) && p2.length > 0) return p2;
	}
	const trimmed = koOrMixedArtist.trim();
	if (!hasHangul(trimmed)) return trimmed;

	for (const [enKey, koVal] of Object.entries(KOREAN_ARTIST_DICT)) {
		if (koVal === trimmed) return enKey;
	}
	return null;
}

export interface KoreanSearchResolution {
	originalQuery: string;
	koTitle?: string;
	koArtist?: string;
	enTitle?: string;
	enArtist?: string;
	enAlbum?: string;
	trackNumber?: number;
	isrc?: string;
	searchQueries: string[];
}

/**
 * Built-in dictionary for Korean phonetic loanword titles (외래어 표기 곡명)
 * and representative hit songs whose single-word Korean title may match unrelated songs first.
 */
const KOREAN_PHONETIC_AND_HIT_TITLES: Record<
	string,
	{ enTitle: string; enArtist?: string; koArtist?: string; isrc?: string }
> = {
	"하입보이": { enTitle: "Hype Boy", enArtist: "NewJeans", koArtist: "뉴진스", isrc: "KRA402200010" },
	"하입 보이": { enTitle: "Hype Boy", enArtist: "NewJeans", koArtist: "뉴진스", isrc: "KRA402200010" },
	"어텐션": { enTitle: "Attention", enArtist: "NewJeans", koArtist: "뉴진스" },
	"디토": { enTitle: "Ditto", enArtist: "NewJeans", koArtist: "뉴진스" },
	"오엠지": { enTitle: "OMG", enArtist: "NewJeans", koArtist: "뉴진스" },
	"슈퍼샤이": { enTitle: "Super Shy", enArtist: "NewJeans", koArtist: "뉴진스" },
	"슈퍼 샤이": { enTitle: "Super Shy", enArtist: "NewJeans", koArtist: "뉴진스" },
	"버블검": { enTitle: "Bubble Gum", enArtist: "NewJeans", koArtist: "뉴진스" },
	"버블 검": { enTitle: "Bubble Gum", enArtist: "NewJeans", koArtist: "뉴진스" },
	"하우스윗": { enTitle: "How Sweet", enArtist: "NewJeans", koArtist: "뉴진스" },
	"하우 스윗": { enTitle: "How Sweet", enArtist: "NewJeans", koArtist: "뉴진스" },
	"슈퍼노바": { enTitle: "Supernova", enArtist: "aespa", koArtist: "에스파" },
	"아마겟돈": { enTitle: "Armageddon", enArtist: "aespa", koArtist: "에스파" },
	"위플래쉬": { enTitle: "Whiplash", enArtist: "aespa", koArtist: "에스파" },
	"위플래시": { enTitle: "Whiplash", enArtist: "aespa", koArtist: "에스파" },
	"넥스트 레벨": { enTitle: "Next Level", enArtist: "aespa", koArtist: "에스파" },
	"넥스트레벨": { enTitle: "Next Level", enArtist: "aespa", koArtist: "에스파" },
	"드라마": { enTitle: "Drama", enArtist: "aespa", koArtist: "에스파" },
	"스파이시": { enTitle: "Spicy", enArtist: "aespa", koArtist: "에스파" },
	"블랙맘바": { enTitle: "Black Mamba", enArtist: "aespa", koArtist: "에스파" },
	"새비지": { enTitle: "Savage", enArtist: "aespa", koArtist: "에스파" },
	"러브 윈즈 올": { enTitle: "Love wins all", enArtist: "IU", koArtist: "아이유" },
	"러브윈즈올": { enTitle: "Love wins all", enArtist: "IU", koArtist: "아이유" },
	"홀씨": { enTitle: "Holssi", enArtist: "IU", koArtist: "아이유" },
	"쇼퍼": { enTitle: "Shopper", enArtist: "IU", koArtist: "아이유" },
	"스트로베리 문": { enTitle: "strawberry moon", enArtist: "IU", koArtist: "아이유" },
	"스트로베리문": { enTitle: "strawberry moon", enArtist: "IU", koArtist: "아이유" },
	"셀러브리티": { enTitle: "Celebrity", enArtist: "IU", koArtist: "아이유" },
	"블루밍": { enTitle: "Blueming", enArtist: "IU", koArtist: "아이유" },
	"러브 포엠": { enTitle: "Love poem", enArtist: "IU", koArtist: "아이유" },
	"러브포엠": { enTitle: "Love poem", enArtist: "IU", koArtist: "아이유" },
	"이지": { enTitle: "EASY", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"스마트": { enTitle: "Smart", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"크레이지": { enTitle: "CRAZY", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"언포기븐": { enTitle: "UNFORGIVEN", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"안티프래자일": { enTitle: "ANTIFRAGILE", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"피어리스": { enTitle: "FEARLESS", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"퍼펙트 나이트": { enTitle: "Perfect Night", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"퍼펙트나이트": { enTitle: "Perfect Night", enArtist: "LE SSERAFIM", koArtist: "르세라핌" },
	"러브 다이브": { enTitle: "LOVE DIVE", enArtist: "IVE", koArtist: "아이브" },
	"러브다이브": { enTitle: "LOVE DIVE", enArtist: "IVE", koArtist: "아이브" },
	"애프터 라이크": { enTitle: "After LIKE", enArtist: "IVE", koArtist: "아이브" },
	"애프터라이크": { enTitle: "After LIKE", enArtist: "IVE", koArtist: "아이브" },
	"아이 엠": { enTitle: "I AM", enArtist: "IVE", koArtist: "아이브" },
	"아이엠": { enTitle: "I AM", enArtist: "IVE", koArtist: "아이브" },
	"배디": { enTitle: "Baddie", enArtist: "IVE", koArtist: "아이브" },
	"키치": { enTitle: "Kitsch", enArtist: "IVE", koArtist: "아이브" },
	"일레븐": { enTitle: "ELEVEN", enArtist: "IVE", koArtist: "아이브" },
	"해야": { enTitle: "HEYA", enArtist: "IVE", koArtist: "아이브", isrc: "QM4TX2478220" },
	"아센디오": { enTitle: "Accendio", enArtist: "IVE", koArtist: "아이브" },
	"아파트": { enTitle: "APT.", enArtist: "ROSÉ", koArtist: "로제" },
	"다이너마이트": { enTitle: "Dynamite", enArtist: "BTS", koArtist: "방탄소년단" },
	"버터": { enTitle: "Butter", enArtist: "BTS", koArtist: "방탄소년단" },
	"세븐": { enTitle: "Seven", enArtist: "Jung Kook", koArtist: "정국" },
	"사계": { enTitle: "Four Seasons", enArtist: "Taeyeon", koArtist: "태연", isrc: "KRA301900154" },
	"예뻤어": { enTitle: "You Were Beautiful", enArtist: "DAY6", koArtist: "데이식스", isrc: "US5TA1700019" },
	"봄날": { enTitle: "Spring Day", enArtist: "BTS", koArtist: "방탄소년단", isrc: "KRA381700253" },
	"밤편지": { enTitle: "Through the Night", enArtist: "IU", koArtist: "아이유", isrc: "KRA381700611" },
	"놓아 놓아 놓아": { enTitle: "Letting Go", enArtist: "DAY6", koArtist: "데이식스", isrc: "US5TA1600014" },
	"놓아놓아놓아": { enTitle: "Letting Go", enArtist: "DAY6", koArtist: "데이식스", isrc: "US5TA1600014" },
	"한 페이지가 될 수 있게": { enTitle: "Time of Our Life", enArtist: "DAY6", koArtist: "데이식스" },
	"한페이지가 될 수 있게": { enTitle: "Time of Our Life", enArtist: "DAY6", koArtist: "데이식스" },
	"웰컴 투 더 쇼": { enTitle: "Welcome to the Show", enArtist: "DAY6", koArtist: "데이식스" },
	"해피": { enTitle: "HAPPY", enArtist: "DAY6", koArtist: "데이식스" },
	"녹아내려요": { enTitle: "Melt Down", enArtist: "DAY6", koArtist: "데이식스" },
	"어떻게 이별까지 사랑하겠어": {
		enTitle: "How can I love the heartbreak, you're the one I love",
		enArtist: "AKMU",
		koArtist: "악뮤",
		isrc: "KRA401900217",
	},
	"어떻게 이별까지 사랑하겠어, 널 사랑하는 거지": {
		enTitle: "How can I love the heartbreak, you're the one I love",
		enArtist: "AKMU",
		koArtist: "악뮤",
		isrc: "KRA401900217",
	},
	"만찬가": { enTitle: "Bansanka" },
	"괴수의 꽃노래": { enTitle: "Kaiju no Hanauta", enArtist: "Vaundy" },
	"밤을 달리다": { enTitle: "Yoru ni Kakeru", enArtist: "YOASOBI" },
	"베텔게우스": { enTitle: "Betelgeuse", enArtist: "Yuuri" },
	"드라이 플라워": { enTitle: "Dry Flower", enArtist: "Yuuri" },
	"드라이플라워": { enTitle: "Dry Flower", enArtist: "Yuuri" },
	"블링방방본": { enTitle: "Bling-Bang-Bang-Born", enArtist: "Creepy Nuts" },
};

function lookupEnglishArtistFromKorean(koName?: string | null): string | undefined {
	if (!koName) return undefined;
	const trimmed = koName.trim();
	if (trimmed === "악동뮤지션") return "AKMU";
	for (const [enKey, koVal] of Object.entries(KOREAN_ARTIST_DICT)) {
		if (koVal === trimmed) return enKey;
	}
	return undefined;
}

/**
 * Translates a Korean search query (e.g., "놓아 놓아 놓아", "아이유 밤편지", "데이식스 예뻤어", "태연 사계")
 * into English TIDAL search queries and ISRC/album/trackNumber hints using 100% ToS-compliant
 * Public Domain (CC0 MusicBrainz) + official iTunes Search APIs!
 */
export async function resolveKoreanSearchQuery(query: string): Promise<KoreanSearchResolution> {
	const clean = query.trim();
	const out: KoreanSearchResolution = {
		originalQuery: clean,
		searchQueries: [clean],
	};

	if (!hasHangul(clean)) {
		return out;
	}

	const addCandidate = (q?: string | null) => {
		if (!q) return;
		const trimmed = q.trim();
		if (trimmed && !out.searchQueries.includes(trimmed)) {
			out.searchQueries.push(trimmed);
		}
	};

	// Extract known Korean artist prefix or suffix if present (e.g. "태연 사계", "데이식스 예뻤어")
	let songPart = clean;
	let userSpecifiedArtist = false;
	let isArtistOnlyQuery = false;
	const artistEntries = Object.entries(KOREAN_ARTIST_DICT).sort((a, b) => b[1].length - a[1].length);
	for (const [enKey, koVal] of artistEntries) {
		if (clean === koVal) {
			out.koArtist = koVal;
			out.enArtist = enKey;
			userSpecifiedArtist = true;
			isArtistOnlyQuery = true;
			addCandidate(enKey);
			break;
		} else if (clean.startsWith(koVal + " ")) {
			songPart = clean.slice(koVal.length).trim();
			out.koArtist = koVal;
			out.enArtist = enKey;
			userSpecifiedArtist = true;
			if (!hasHangul(songPart)) {
				addCandidate(`${enKey} ${songPart}`);
			}
			break;
		} else if (clean.endsWith(" " + koVal)) {
			songPart = clean.slice(0, clean.length - koVal.length).trim();
			out.koArtist = koVal;
			out.enArtist = enKey;
			userSpecifiedArtist = true;
			if (!hasHangul(songPart)) {
				addCandidate(`${enKey} ${songPart}`);
			}
			break;
		}
	}

	// Step 0: Check built-in phonetic & hit song dictionary
	const dictHit = KOREAN_PHONETIC_AND_HIT_TITLES[songPart] || KOREAN_PHONETIC_AND_HIT_TITLES[clean];
	if (dictHit) {
		out.koTitle = songPart;
		out.enTitle = dictHit.enTitle;
		if (!out.enArtist && dictHit.enArtist) out.enArtist = dictHit.enArtist;
		if (!out.koArtist && dictHit.koArtist) out.koArtist = dictHit.koArtist;
		if (!out.isrc && dictHit.isrc) out.isrc = dictHit.isrc;
	}

	// Step 0.5: If artist is known and we don't have enTitle yet, perform iTunes US search + single batch KR lookup!
	if (!out.enTitle && out.enArtist && hasHangul(songPart) && songPart !== out.koArtist) {
		const usArtistSongs = await fetchJsonWithTimeout<{
			results?: Array<{ trackId: number; trackName: string; artistName: string; collectionName?: string }>;
		}>(`https://itunes.apple.com/search?term=${encodeURIComponent(out.enArtist)}&country=US&media=music&entity=song&limit=60`);
		const usList = usArtistSongs?.results ?? [];
		if (usList.length > 0) {
			const ids = usList.map((r) => r.trackId).filter(Boolean).slice(0, 60).join(",");
			const krBatch = await fetchJsonWithTimeout<{
				results?: Array<{ trackId: number; trackName?: string }>;
			}>(`https://itunes.apple.com/lookup?id=${ids}&country=KR&lang=ko_kr`);
			const normTarget = normalizeTitleForCompare(songPart);
			const usById = new Map(usList.map((r) => [r.trackId, r]));
			for (const krItem of krBatch?.results ?? []) {
				if (!krItem.trackName) continue;
				const normKr = normalizeTitleForCompare(krItem.trackName);
				if (normKr && (normKr === normTarget || normKr.includes(normTarget) || normTarget.includes(normKr))) {
					const matchedUs = usById.get(krItem.trackId);
					if (matchedUs?.trackName && !hasHangul(matchedUs.trackName)) {
						out.koTitle = krItem.trackName;
						out.enTitle = matchedUs.trackName;
						out.enArtist = matchedUs.artistName || out.enArtist;
						out.enAlbum = matchedUs.collectionName || out.enAlbum;
						break;
					}
				}
			}
		}
	}

	// Step 1: Query MusicBrainz (CC0 Public Domain) if still unresolved
	let firstReleaseDate: string | undefined;
	if (!out.enTitle && hasHangul(songPart) && songPart !== out.koArtist) {
		const mbQuery = `recording:"${songPart}"`;
		const mbUrl = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(mbQuery)}&fmt=json&limit=10`;
		const mbData = await fetchJsonWithTimeout<{
			recordings?: Array<{
				id: string;
				title: string;
				"first-release-date"?: string;
				isrcs?: string[];
				"artist-credit"?: Array<{ name: string; artist?: { name: string } }>;
				releases?: Array<{
					title?: string;
					date?: string;
					media?: Array<{
						track?: Array<{ number?: string; title?: string }>;
					}>;
				}>;
			}>;
		}>(mbUrl, { "User-Agent": USER_AGENT });

		const candidates = mbData?.recordings ?? [];
		const targetEnArtistLower = out.enArtist?.toLowerCase();
		const targetKoArtist = out.koArtist;

		// Score recordings so we pick the official K-Pop release with ISRCs / matching artist
		const scored = candidates
			.map((r) => {
				let score = 0;
				const creditName = r["artist-credit"]?.[0]?.name || "";
				const artistName = r["artist-credit"]?.[0]?.artist?.name || "";
				const mappedEn = lookupEnglishArtistFromKorean(creditName) || lookupEnglishArtistFromKorean(artistName);
				if (targetEnArtistLower) {
					if (
						creditName.toLowerCase() === targetEnArtistLower ||
						artistName.toLowerCase() === targetEnArtistLower ||
						mappedEn?.toLowerCase() === targetEnArtistLower
					) {
						score += 100;
					} else if (targetKoArtist && (creditName.includes(targetKoArtist) || artistName.includes(targetKoArtist))) {
						score += 100;
					} else {
						score -= 50;
					}
				} else if (mappedEn || lookupArtistDict(artistName) || lookupArtistDict(creditName)) {
					score += 40;
				}
				if (r.isrcs?.length) score += 30;
				if (r.releases?.some((rel) => rel.title && !hasHangul(rel.title))) score += 15;
				return { rec: r, score, mappedEn };
			})
			.sort((a, b) => b.score - a.score);

		const best = scored[0];
		const rec = best && best.score >= 0 ? best.rec : undefined;

		if (rec) {
			out.koTitle = songPart;
			if (rec.isrcs?.[0]) {
				out.isrc = rec.isrcs[0];
			}
			if (rec["first-release-date"]) {
				firstReleaseDate = rec["first-release-date"];
			}
			const mbArtist = rec["artist-credit"]?.[0]?.artist?.name || rec["artist-credit"]?.[0]?.name;
			if (!out.enArtist) {
				if (best.mappedEn) {
					out.enArtist = best.mappedEn;
				} else if (mbArtist && !hasHangul(mbArtist)) {
					out.enArtist = mbArtist;
				}
			}

			// Check if recording title itself contains English in parentheses, e.g., "사계 (Four Seasons)"
			const parenEn = rec.title.match(/\(([A-Za-z0-9\s,'?!&-]+)\)/);
			if (parenEn && !/^(feat|ft|with|ver|inst|remix|live|prod)/i.test(parenEn[1].trim())) {
				out.enTitle = parenEn[1].trim();
			} else if (!hasHangul(rec.title)) {
				out.enTitle = rec.title;
			}

			// Inspect releases and media.track[] in MusicBrainz response for English track title or album/trackNumber
			for (const rel of rec.releases ?? []) {
				if (rel.title && !hasHangul(rel.title) && !out.enAlbum) {
					out.enAlbum = rel.title;
				}
				if (rel.date && !firstReleaseDate) {
					firstReleaseDate = rel.date;
				}
				for (const med of rel.media ?? []) {
					for (const trk of med.track ?? []) {
						if (trk.number && !out.trackNumber) {
							const num = Number.parseInt(trk.number, 10);
							if (!Number.isNaN(num)) out.trackNumber = num;
						}
						if (trk.title && !out.enTitle) {
							const trkParen = trk.title.match(/\(([A-Za-z0-9\s,'?!&-]+)\)/);
							if (trkParen && !/^(feat|ft|with|ver|inst|remix|live|prod)/i.test(trkParen[1].trim())) {
								out.enTitle = trkParen[1].trim();
							} else if (!hasHangul(trk.title)) {
								out.enTitle = trk.title;
							}
						}
					}
				}
			}
		}
	}

	// Step 2: If MusicBrainz gave us artist + album/trackNumber or releaseDate, but no English title yet
	// (e.g., "밤편지" where MusicBrainz only has Korean release title), resolve via official iTunes Search/Lookup API
	if (!out.enTitle && out.enArtist) {
		if (out.enAlbum && out.trackNumber) {
			const albSearchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(`${out.enArtist} ${out.enAlbum}`)}&country=US&media=music&entity=album&limit=3`;
			const albData = await fetchJsonWithTimeout<{
				results?: Array<{ collectionId: number; collectionName: string }>;
			}>(albSearchUrl);
			const colId = albData?.results?.[0]?.collectionId;
			if (colId) {
				const colLookupUrl = `https://itunes.apple.com/lookup?id=${colId}&entity=song&country=US`;
				const colTracks = await fetchJsonWithTimeout<{
					results?: Array<{ wrapperType: string; trackNumber?: number; trackName?: string; artistName?: string }>;
				}>(colLookupUrl);
				const matchedSong = colTracks?.results?.find(
					(r) => r.wrapperType === "track" && r.trackNumber === out.trackNumber,
				);
				if (matchedSong?.trackName) {
					out.enTitle = matchedSong.trackName;
					if (matchedSong.artistName) out.enArtist = matchedSong.artistName;
				}
			}
		}

		if (!out.enTitle && firstReleaseDate) {
			const songSearchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(out.enArtist)}&country=US&media=music&entity=song&limit=100`;
			const songData = await fetchJsonWithTimeout<{
				results?: Array<{
					trackId: number;
					trackName: string;
					artistName: string;
					releaseDate?: string;
				}>;
			}>(songSearchUrl);
			const dateMatches = (songData?.results ?? []).filter((r) => r.releaseDate?.startsWith(firstReleaseDate!));
			if (dateMatches.length === 1) {
				out.enTitle = dateMatches[0].trackName;
			} else if (dateMatches.length > 1) {
				for (const dm of dateMatches.slice(0, 5)) {
					const krCheck = await fetchJsonWithTimeout<{
						results?: Array<{ trackName?: string }>;
					}>(`https://itunes.apple.com/lookup?id=${dm.trackId}&country=KR&lang=ko_kr`);
					if (krCheck?.results?.[0]?.trackName && out.koTitle && krCheck.results[0].trackName.includes(out.koTitle)) {
						out.enTitle = dm.trackName;
						break;
					}
				}
				if (!out.enTitle) out.enTitle = dateMatches[0].trackName;
			}
		}
	}

	// Step 3: Dynamic MusicBrainz Artist Alias Lookup (if query is a Korean artist name not in static dictionary)
	if (!out.enTitle && !out.enArtist && hasHangul(clean)) {
		const mbArtistUrl = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(`alias:"${clean}" OR artist:"${clean}"`)}&fmt=json&limit=5`;
		const mbArtistData = await fetchJsonWithTimeout<{
			artists?: Array<{
				name: string;
				aliases?: Array<{ name: string; locale?: string; primary?: boolean }>;
			}>;
		}>(mbArtistUrl, { "User-Agent": USER_AGENT });

		for (const art of mbArtistData?.artists ?? []) {
			const exactKoMatch =
				art.name === clean || (art.aliases ?? []).some((a) => a.name.trim() === clean);
			if (!exactKoMatch) continue;

			let resolvedEn: string | undefined;
			if (!hasHangul(art.name)) {
				resolvedEn = art.name;
			} else {
				const enAlias =
					(art.aliases ?? []).find((a) => a.locale?.startsWith("en") && !hasHangul(a.name)) ||
					(art.aliases ?? []).find((a) => !hasHangul(a.name) && /^[A-Za-z0-9\s.&'-]+$/.test(a.name));
				if (enAlias) resolvedEn = enAlias.name;
			}

			if (resolvedEn) {
				out.koArtist = clean;
				out.enArtist = resolvedEn;
				isArtistOnlyQuery = true;
				KOREAN_ARTIST_DICT[resolvedEn.toLowerCase()] = clean;
				break;
			}
		}
	}

	const isRemakeOrCover = Boolean(out.enAlbum && /remake|cover|tribute/i.test(out.enAlbum));

	if (isArtistOnlyQuery && out.enArtist) {
		addCandidate(out.enArtist);
	} else if (out.enTitle) {
		if (!userSpecifiedArtist && (isRemakeOrCover || !out.enArtist)) {
			addCandidate(out.enTitle);
		} else if (out.enArtist) {
			addCandidate(`${out.enTitle} ${out.enArtist}`);
			addCandidate(out.enTitle);
		} else {
			addCandidate(out.enTitle);
		}
	}

	// Move English candidates to the front of searchQueries so TIDAL finds them first!
	const enFirst = out.searchQueries.filter((q) => !hasHangul(q));
	const koRest = out.searchQueries.filter((q) => hasHangul(q));
	out.searchQueries = [...enFirst, ...koRest];

	return out;
}

/**
 * Checks whether an ISRC belongs to a Korean registrant or well-known K-Pop distributor
 */
export function isKoreanIsrc(isrc?: string | null): boolean {
	if (!isrc) return false;
	const upper = isrc.toUpperCase().trim();
	// Standard Korean ISRC country codes: KR (Korea), KRA, KRB, KRC, etc.
	if (upper.startsWith("KR")) return true;
	// JYP Entertainment often uses US5TA, HYBE/YG/SM sometimes use USA2P,QMDA, etc.
	if (upper.startsWith("US5TA")) return true;
	return false;
}

/**
 * Formats title/artist according to user preference
 */
export function formatDisplayPair(
	original: string,
	korean: string | null | undefined,
	mode: DisplayFormatMode = "ko_with_orig",
): string {
	if (!korean || !korean.trim()) return original;
	const origTrim = original.trim();
	const koTrim = korean.trim();

	// If identical or original already contains the Korean string
	if (origTrim.toLowerCase() === koTrim.toLowerCase()) return origTrim;
	if (origTrim.includes(koTrim)) return origTrim;
	if (koTrim.toLowerCase().includes(`(${origTrim.toLowerCase()})`)) {
		if (mode === "ko_only") {
			return koTrim.replace(new RegExp(`\\s*\\(${origTrim.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`, "i"), "").trim();
		}
		if (mode === "ko_with_orig") return koTrim;
	}

	switch (mode) {
		case "ko_only":
			return koTrim;
		case "orig_with_ko":
			return `${origTrim} (${koTrim})`;
		case "ko_with_orig":
		default:
			return `${koTrim} (${origTrim})`;
	}
}

function normalizeTitleForCompare(str: string): string {
	return str
		.toLowerCase()
		.replace(/\(.*?\)|\[.*?\]/g, "")
		.replace(/[^a-z0-9가-힣]/g, "")
		.trim();
}

export interface ResolveInput {
	trackId: string;
	title: string;
	artist: string;
	album?: string;
	trackNumber?: number;
	volumeNumber?: number;
	isrc?: string | null;
	copyright?: string | null;
	formatMode?: DisplayFormatMode;
	override?: { koTitle?: string; koArtist?: string } | null;
	cached?: KoreanTrackMeta | null;
	fetcher?: <T>(url: string, headers?: Record<string, string>, timeoutMs?: number) => Promise<T | null>;
}

const USER_AGENT = "TidaLunaKoRemote/1.0.0 (https://github.com/welldoingk/tidal-luna-ko-remote)";
let lastMbCallTime = 0;
let customFetcher: (<T>(url: string, headers?: Record<string, string>, timeoutMs?: number) => Promise<T | null>) | null = null;

export function setCustomJsonFetcher(fn: <T>(url: string, headers?: Record<string, string>, timeoutMs?: number) => Promise<T | null>) {
	customFetcher = fn;
}

async function fetchJsonWithTimeout<T>(url: string, headers: Record<string, string> = {}, timeoutMs = 5500): Promise<T | null> {
	if (url.includes("musicbrainz.org")) {
		const now = Date.now();
		const elapsed = now - lastMbCallTime;
		if (elapsed < 1050) {
			await new Promise((r) => setTimeout(r, 1050 - elapsed));
		}
		lastMbCallTime = Date.now();
	}
	if (customFetcher) {
		const res = await customFetcher<T>(url, headers, timeoutMs);
		if (res !== null) return res;
	}
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			headers: {
				Accept: "application/json",
				...headers,
			},
			signal: controller.signal,
		});
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
	}
}

/**
 * Step 1: Query MusicBrainz by ISRC
 */
async function queryMusicBrainzByIsrc(isrc: string): Promise<{ koTitle?: string; koArtist?: string } | null> {
	const url = `https://musicbrainz.org/ws/2/isrc/${encodeURIComponent(isrc)}?inc=artist-credits+aliases&fmt=json`;
	const data = await fetchJsonWithTimeout<{
		recordings?: Array<{
			id: string;
			title: string;
			aliases?: Array<{ name: string; locale?: string; primary?: boolean }>;
			"artist-credit"?: Array<{
				name: string;
				artist?: {
					name: string;
					aliases?: Array<{ name: string; locale?: string; primary?: boolean }>;
				};
			}>;
		}>;
	}>(url, { "User-Agent": USER_AGENT });

	if (!data?.recordings?.length) return null;

	let koTitle: string | undefined;
	let koArtist: string | undefined;

	for (const rec of data.recordings) {
		if (!koTitle && hasHangul(rec.title)) {
			koTitle = rec.title;
		}
		if (!koTitle && rec.aliases?.length) {
			const koAlias = rec.aliases.find((a) => a.locale === "ko" && hasHangul(a.name)) ?? rec.aliases.find((a) => hasHangul(a.name));
			if (koAlias) koTitle = koAlias.name;
		}

		if (!koArtist && rec["artist-credit"]?.length) {
			const ac = rec["artist-credit"][0];
			if (hasHangul(ac.name)) {
				koArtist = ac.name;
			} else if (ac.artist && hasHangul(ac.artist.name)) {
				koArtist = ac.artist.name;
			} else if (ac.artist?.aliases?.length) {
				const artistKoAlias =
					ac.artist.aliases.find((a) => a.locale === "ko" && a.primary && hasHangul(a.name)) ??
					ac.artist.aliases.find((a) => a.locale === "ko" && hasHangul(a.name)) ??
					ac.artist.aliases.find((a) => hasHangul(a.name));
				if (artistKoAlias) koArtist = artistKoAlias.name;
			}
		}
	}

	if (koTitle || koArtist) {
		return { koTitle, koArtist };
	}
	return null;
}

/**
 * Step 2: Query iTunes Search API (US) -> Lookup (KR, lang=ko_kr)
 */
async function queryItunesKr(
	title: string,
	artist: string,
): Promise<{ koTitle?: string; koArtist?: string; koAlbum?: string; isKpop?: boolean } | null> {
	const cleanTitle = title.replace(/\s*\((?:feat\.|ft\.|with|prod\.).*?\)/gi, "").trim();
	const primaryArtist = artist.split(/\s*(?:,|&)\s*/)[0].trim();
	const term = `${primaryArtist} ${cleanTitle}`;

	const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=US&media=music&entity=song&limit=5`;
	const searchData = await fetchJsonWithTimeout<{
		resultCount: number;
		results: Array<{
			trackId: number;
			artistId: number;
			trackName: string;
			artistName: string;
			collectionName?: string;
			primaryGenreName?: string;
		}>;
	}>(searchUrl);

	if (!searchData?.results?.length) return null;

	const normTargetTitle = normalizeTitleForCompare(cleanTitle);
	const normTargetArtist = normalizeTitleForCompare(primaryArtist);

	const matched =
		searchData.results.find(
			(r) =>
				normalizeTitleForCompare(r.trackName) === normTargetTitle &&
				(normalizeTitleForCompare(r.artistName).includes(normTargetArtist) ||
					normTargetArtist.includes(normalizeTitleForCompare(r.artistName))),
		) ??
		searchData.results.find((r) => normalizeTitleForCompare(r.trackName).includes(normTargetTitle)) ??
		searchData.results[0];

	if (!matched?.trackId) return null;

	const isKpop =
		matched.primaryGenreName?.toLowerCase().includes("k-pop") ||
		matched.primaryGenreName?.toLowerCase().includes("korean") ||
		false;

	const lookupUrl = `https://itunes.apple.com/lookup?id=${matched.trackId}&country=KR&lang=ko_kr`;
	const lookupData = await fetchJsonWithTimeout<{
		resultCount: number;
		results: Array<{
			trackName?: string;
			artistName?: string;
			collectionName?: string;
			primaryGenreName?: string;
		}>;
	}>(lookupUrl);

	const krItem = lookupData?.results?.[0];
	let koTitle: string | undefined;
	let koArtist: string | undefined;
	let koAlbum: string | undefined;

	if (krItem) {
		if (krItem.trackName && hasHangul(krItem.trackName)) koTitle = krItem.trackName;
		if (krItem.artistName && hasHangul(krItem.artistName)) koArtist = krItem.artistName;
		if (krItem.collectionName && hasHangul(krItem.collectionName)) koAlbum = krItem.collectionName;
	}

	return { koTitle, koArtist, koAlbum, isKpop };
}

/**
 * Step 3: Query MusicBrainz Release-Group (Hangul script release tracklist) by album + artist + trackNumber
 */
async function queryMusicBrainzHangulRelease(
	albumTitle: string,
	artistName: string,
	trackNumber?: number,
): Promise<{ koTitle?: string; koArtist?: string; koAlbum?: string } | null> {
	if (!albumTitle || !trackNumber || trackNumber < 1) return null;
	const cleanAlbum = albumTitle.replace(/\s*\((?:deluxe|special|ep|single).*?\)/gi, "").trim();
	const primaryArtist = artistName.split(/\s*(?:,|&)\s*/)[0].trim();

	const searchQuery = `release:"${cleanAlbum}" AND artist:"${primaryArtist}"`;
	const searchUrl = `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(searchQuery)}&fmt=json&limit=5`;

	const searchRes = await fetchJsonWithTimeout<{
		releases?: Array<{
			id: string;
			title: string;
			"release-group"?: { id: string };
		}>;
	}>(searchUrl, { "User-Agent": USER_AGENT });

	const rgId = searchRes?.releases?.[0]?.["release-group"]?.id;
	if (!rgId) return null;

	const rgUrl = `https://musicbrainz.org/ws/2/release?release-group=${encodeURIComponent(rgId)}&inc=recordings+artist-credits+aliases&fmt=json`;
	const rgRes = await fetchJsonWithTimeout<{
		releases?: Array<{
			title: string;
			"text-representation"?: { language?: string; script?: string };
			"artist-credit"?: Array<{
				name: string;
				artist?: {
					name: string;
					aliases?: Array<{ name: string; locale?: string; primary?: boolean }>;
				};
			}>;
			media?: Array<{
				tracks?: Array<{
					number?: string;
					position?: number;
					title: string;
				}>;
			}>;
		}>;
	}>(rgUrl, { "User-Agent": USER_AGENT });

	if (!rgRes?.releases?.length) return null;

	const koreRelease =
		rgRes.releases.find((r) => r["text-representation"]?.script === "Kore") ??
		rgRes.releases.find((r) => r.media?.[0]?.tracks?.some((t) => hasHangul(t.title)));

	if (!koreRelease) return null;

	const tracks = koreRelease.media?.[0]?.tracks ?? [];
	const targetTrack = tracks.find((t) => t.position === trackNumber || Number(t.number) === trackNumber) ?? tracks[trackNumber - 1];

	let koTitle: string | undefined;
	let koArtist: string | undefined;
	let koAlbum: string | undefined;

	if (targetTrack && hasHangul(targetTrack.title)) {
		koTitle = targetTrack.title;
	}
	if (hasHangul(koreRelease.title)) {
		koAlbum = koreRelease.title;
	}
	const ac = koreRelease["artist-credit"]?.[0];
	if (ac) {
		if (hasHangul(ac.name)) koArtist = ac.name;
		else if (ac.artist?.aliases) {
			const alias = ac.artist.aliases.find((a) => a.locale === "ko" && hasHangul(a.name));
			if (alias) koArtist = alias.name;
		}
	}

	if (koTitle || koArtist || koAlbum) {
		return { koTitle, koArtist, koAlbum };
	}
	return null;
}

/**
 * Main resolver function for a track's Korean metadata
 */
export async function resolveKoreanMetadata(input: ResolveInput): Promise<KoreanTrackMeta> {
	const formatMode: DisplayFormatMode = input.formatMode ?? "ko_with_orig";
	const dictArtist = lookupArtistDict(input.artist);

	// 0. Manual override check
	if (input.override && (input.override.koTitle || input.override.koArtist)) {
		const koTitle = input.override.koTitle || null;
		const koArtist = input.override.koArtist || dictArtist || null;
		return {
			trackId: String(input.trackId),
			isrc: input.isrc,
			originalTitle: input.title,
			originalArtist: input.artist,
			originalAlbum: input.album,
			koTitle,
			koArtist,
			displayTitle: formatDisplayPair(input.title, koTitle, formatMode),
			displayArtist: formatDisplayPair(input.artist, koArtist, formatMode),
			displayAlbum: input.album,
			isKorean: true,
			source: "override",
			updatedAt: Date.now(),
		};
	}

	// 1. Check cache
	if (input.cached && input.cached.originalTitle === input.title) {
		const koTitle = input.cached.koTitle;
		const koArtist = input.cached.koArtist || dictArtist;
		return {
			...input.cached,
			koArtist,
			displayTitle: formatDisplayPair(input.title, koTitle, formatMode),
			displayArtist: formatDisplayPair(input.artist, koArtist, formatMode),
		};
	}

	// If title & artist already contain Hangul, no external translation needed
	if (hasHangul(input.title) && hasHangul(input.artist)) {
		return {
			trackId: String(input.trackId),
			isrc: input.isrc,
			originalTitle: input.title,
			originalArtist: input.artist,
			originalAlbum: input.album,
			koTitle: input.title,
			koArtist: input.artist,
			displayTitle: input.title,
			displayArtist: input.artist,
			displayAlbum: input.album,
			isKorean: true,
			source: "none",
			updatedAt: Date.now(),
		};
	}

	// Determine if this track is likely Korean
	const isKrIsrc = isKoreanIsrc(input.isrc);
	const hasHangulAlready = hasHangul(input.title) || hasHangul(input.artist) || hasHangul(input.album);
	const isKnownKrArtist = !!dictArtist;

	let koTitle: string | undefined = hasHangul(input.title) ? input.title : undefined;
	let koArtist: string | undefined = hasHangul(input.artist) ? input.artist : (dictArtist ?? undefined);
	let koAlbum: string | undefined = hasHangul(input.album) ? input.album : undefined;
	let source: KoreanTrackMeta["source"] = isKnownKrArtist ? "dictionary" : "none";
	let isKorean = isKrIsrc || hasHangulAlready || isKnownKrArtist;

	// Step A: MusicBrainz ISRC lookup (very fast & accurate when ISRC is registered)
	if (input.isrc && (!koTitle || !koArtist)) {
		const mbIsrc = await queryMusicBrainzByIsrc(input.isrc);
		if (mbIsrc) {
			if (mbIsrc.koTitle && !koTitle) {
				koTitle = mbIsrc.koTitle;
				source = "musicbrainz-isrc";
			}
			if (mbIsrc.koArtist && !koArtist) {
				koArtist = mbIsrc.koArtist;
				if (source === "none") source = "musicbrainz-isrc";
			}
			isKorean = true;
		}
	}

	// Step B: iTunes US -> KR Lookup
	if (!koTitle || !koArtist) {
		const itunes = await queryItunesKr(input.title, input.artist);
		if (itunes) {
			if (itunes.isKpop) isKorean = true;
			if (itunes.koTitle && !koTitle) {
				koTitle = itunes.koTitle;
				source = "itunes-kr";
				isKorean = true;
			}
			if (itunes.koArtist && !koArtist) {
				koArtist = itunes.koArtist;
				if (source === "none") source = "itunes-kr";
				isKorean = true;
			}
			if (itunes.koAlbum && !koAlbum) {
				koAlbum = itunes.koAlbum;
			}
		}
	}

	// Step C: If it's a Korean track (by ISRC, K-Pop genre, or Korean artist) and title is still English,
	// check MusicBrainz Release-Group (Hangul script release tracklist)
	if (isKorean && !koTitle && input.album && input.trackNumber) {
		const mbAlbum = await queryMusicBrainzHangulRelease(input.album, input.artist, input.trackNumber);
		if (mbAlbum) {
			if (mbAlbum.koTitle && !koTitle) {
				koTitle = mbAlbum.koTitle;
				source = "musicbrainz-album";
			}
			if (mbAlbum.koArtist && !koArtist) {
				koArtist = mbAlbum.koArtist;
			}
			if (mbAlbum.koAlbum && !koAlbum) {
				koAlbum = mbAlbum.koAlbum;
			}
		}
	}

	return {
		trackId: String(input.trackId),
		isrc: input.isrc,
		originalTitle: input.title,
		originalArtist: input.artist,
		originalAlbum: input.album,
		koTitle: koTitle ?? null,
		koArtist: koArtist ?? null,
		koAlbum: koAlbum ?? null,
		displayTitle: formatDisplayPair(input.title, koTitle, formatMode),
		displayArtist: formatDisplayPair(input.artist, koArtist, formatMode),
		displayAlbum: input.album ? formatDisplayPair(input.album, koAlbum, formatMode) : undefined,
		isKorean,
		source,
		updatedAt: Date.now(),
	};
}
