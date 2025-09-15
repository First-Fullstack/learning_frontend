import { Course, Quiz } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'スペイン語基礎',
    description: '基本的なスペイン語の語彙と文法を学びます。スペイン語の旅を始めたい初心者に最適です。',
    thumbnail: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Languages',
    isPremium: false,
    progress: 65,
    videoUrl: 'https://www.youtube.com/embed/DAp_v7EH9AA',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'ビジネス英語',
    description: '職場でのプロフェッショナルな英語コミュニケーションをマスターします。メール作成、プレゼンテーション、会議を含みます。',
    thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Languages',
    isPremium: true,
    progress: 30,
    videoUrl: 'https://www.youtube.com/embed/VuDPk5_9zws',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'フランス語発音',
    description: 'ネイティブスピーカーの指導とインタラクティブな演習でフランス語のアクセントと発音を完璧にします。',
    thumbnail: 'https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Languages',
    isPremium: true,
    progress: 0,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    difficulty: 'Intermediate'
  },
  {
    id: '4',
    title: 'デジタルマーケティング基礎',
    description: 'SEO、ソーシャルメディア、メールマーケティング戦略を含むデジタルマーケティングの基礎を学びます。',
    thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Business',
    isPremium: false,
    progress: 80,
    videoUrl: 'https://www.youtube.com/embed/bRzuL0TkMI0',
    difficulty: 'Beginner'
  },
  {
    id: '5',
    title: '写真マスタークラス',
    description: '基本的な構図から高度な照明技術まで、写真スキルを開発します。',
    thumbnail: 'https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Creative',
    isPremium: true,
    progress: 15,
    videoUrl: 'https://www.youtube.com/embed/LxO-6rlihSg',
    difficulty: 'Advanced'
  },
  {
    id: '6',
    title: '料理基礎',
    description: '基本的な料理技術をマスターし、一から美味しい料理を作る方法を学びます。',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Lifestyle',
    isPremium: false,
    progress: 45,
    videoUrl: 'https://www.youtube.com/embed/ZJy1ajvMU1k',
    difficulty: 'Beginner'
  }
];

export const mockQuizzes: Quiz[] = [
  {
    courseId: '1',
    questions: [
      {
        id: '1',
        question: '「Hello」はスペイン語で何と言いますか？',
        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: '「Gracias」は英語で何を意味しますか？',
        options: ['Please', 'Sorry', 'Thank you', 'Excuse me'],
        correctAnswer: 2
      },
      {
        id: '3',
        question: 'スペイン語で「おはよう」を正しく言う方法はどれですか？',
        options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
        correctAnswer: 1
      }
    ]
  },
  {
    courseId: '4',
    questions: [
      {
        id: '1',
        question: 'SEOは何の略ですか？',
        options: ['Social Engagement Optimization', 'Search Engine Optimization', 'Sales Enhancement Operations', 'Site Effectiveness Overview'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: 'B2Bマーケティングに最適なソーシャルメディアプラットフォームはどれですか？',
        options: ['Instagram', 'TikTok', 'LinkedIn', 'Snapchat'],
        correctAnswer: 2
      },
      {
        id: '3',
        question: 'ほとんどの業界で良いメール開封率はどれですか？',
        options: ['5-10%', '15-25%', '35-45%', '50-60%'],
        correctAnswer: 1
      }
    ]
  },
  {
    courseId: '6',
    questions: [
      {
        id: '1',
        question: '鶏肉を安全に調理する温度はどれですか？',
        options: ['145°F', '160°F', '165°F', '180°F'],
        correctAnswer: 2
      },
      {
        id: '2',
        question: '野菜を切るのに最適なナイフはどれですか？',
        options: ['ペアリングナイフ', 'シェフナイフ', 'パンナイフ', 'ステーキナイフ'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: '良いパスタソースを作る最初のステップは何ですか？',
        options: ['トマトを加える', '玉ねぎとニンニクを炒める', 'ハーブを加える', '水を沸かす'],
        correctAnswer: 1
      }
    ]
  }
];

export const categories = ['All', 'Languages', 'Business', 'Creative', 'Lifestyle'];