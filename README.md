# 📚 ELA Test Generator - Unlimited AI-Powered Tests with Interactive Feedback

Generate unlimited unique ELA assessment tests for 7th-8th grade students with **AI-powered answer analysis and personalized feedback**!

## 🎯 Two Powerful Modes

### 🖨️ **Print Mode** (Traditional)
- Generate and print tests
- Students fill on paper
- Teacher grades manually
- Perfect for formal assessments

### 🎓 **Interactive Mode** (NEW!)
- Students take test online
- Type answers in browser
- Submit for AI analysis
- Get instant detailed feedback
- Learn from personalized explanations

## 📖 Test Coverage

Tests include:
- **Plot Elements** (exposition, conflict, rising action, climax, falling action, resolution)
- **Poetry Analysis** (theme, mood, tone, structure)
- **Vocabulary Practice** (synonyms, antonyms, context clues, prefixes)

## ✨ Features

### 🤖 AI Mode (Unlimited Unique Tests)
- Generates completely original stories every time
- Creates custom poems with literary devices
- Produces fresh vocabulary words and exercises
- Never repeat the same content

### ⚡ Quick Mode (Instant Generation)
- 3 pre-written quality passages
- Instant test generation
- Perfect for practice and demos
- No API costs

### 📋 Professional Format
- Print-ready layout
- Student info fields (name, date, class)
- Clear instructions and writing spaces
- Separate answer key with grading rubric
- 27 questions across 3 sections (30 minutes)

---

## 🚀 Quick Start Guide

Follow these 3 simple steps to get your test generator running:

### Step 1: Get Claude API Key
📄 **Read:** `01-GET-API-KEY.md`

**What you'll do:**
- Create Anthropic account
- Add $5 in credits (~100 tests)
- Generate and save your API key

**Time:** 10 minutes

---

### Step 2: Setup Your Project
📄 **Read:** `02-SETUP-PROJECT.md`

**What you'll do:**
- Upload files to GitHub (easiest) OR
- Setup local project folder

**Time:** 5-10 minutes

---

### Step 3: Deploy to Vercel
📄 **Read:** `03-DEPLOY.md`

**What you'll do:**
- Connect GitHub to Vercel
- Add your API key as environment variable
- Deploy and get your live URL!

**Time:** 10 minutes

---

## 📁 Project Files

Here's what I've created for you:

```
📦 ela-test-generator/
├── 📄 README.md                    ← You are here!
├── 📄 01-GET-API-KEY.md            ← Step 1 guide
├── 📄 02-SETUP-PROJECT.md          ← Step 2 guide
├── 📄 03-DEPLOY.md                 ← Step 3 guide
│
├── 🌐 index.html                   ← Main test generator page
├── ⚙️ package.json                ← Dependencies
├── ⚙️ vercel.json                 ← Vercel config
│
└── 📁 api/
    └── 🔧 generate.js              ← Serverless API function
```

---

## 💰 Cost Breakdown

### One-Time Costs
- **Anthropic API credits:** $5 minimum (gets you ~100 tests)
- **Vercel hosting:** FREE (generous free tier)

### Ongoing Costs
- **Per AI test:** ~$0.04-0.05
- **Quick Mode tests:** FREE (unlimited)
- **Monthly estimate:** $10-20 for moderate use (5-10 AI tests/day)

### Free Tier Limits
- **Vercel:** 100GB bandwidth, 100 serverless function calls/day
- **Your Usage:** Well within free tier for personal use

---

## 🎯 Usage Tips

### When to Use AI Mode
- ✅ Creating actual assessment tests for students
- ✅ Need unique versions for different class periods
- ✅ Want fresh content each time
- ✅ Testing different difficulty levels

### When to Use Quick Mode
- ✅ Demonstrating to colleagues
- ✅ Practice runs
- ✅ Checking format/layout
- ✅ No internet connection
- ✅ Saving API credits

### Best Practices
1. **Start with Quick Mode** to verify everything works
2. **Switch to AI Mode** when you need unique tests
3. **Monitor your API usage** at console.anthropic.com
4. **Add credits proactively** before running out
5. **Print answer keys separately** for grading

---

## 🧪 Test Structure

Each generated test includes:

### Part I: Plot Elements (6 questions)
- 1 short story (300-400 words)
- 5 multiple choice questions identifying plot elements
- 1 short answer about character development

### Part II: Poetry Analysis (6 questions)
- 1 poem (8-12 lines)
- 4 multiple choice on theme, mood, tone, structure
- 2 short answer on literary devices and meaning

### Part III: Vocabulary (15 questions)
- 12 vocabulary words (grade-appropriate)
- 4 synonym questions
- 3 antonym questions
- 3 context clue exercises
- 2 prefix identification with sentences
- 1 paragraph using vocabulary words

**Total:** 27 questions, ~30 minutes, 70 points

---

## 🔒 Security Features

- ✅ API key stored securely in Vercel environment variables
- ✅ Never exposed in browser or client-side code
- ✅ Serverless functions prevent direct API access
- ✅ CORS properly configured
- ✅ No user data collected or stored

---

## 🛠️ Troubleshooting

### Quick Fixes

**Problem:** AI Mode shows error
- **Check:** Environment variable `ANTHROPIC_API_KEY` is set in Vercel
- **Check:** You have credits in your Anthropic account
- **Check:** API key is correct (starts with `sk-ant-`)

**Problem:** Nothing happens when clicking generate
- **Check:** Browser console (F12) for JavaScript errors
- **Try:** Hard refresh (Ctrl+Shift+R)
- **Try:** Different browser

**Problem:** Quick Mode works but AI Mode fails
- **Check:** Serverless function deployed correctly
- **Check:** Vercel Dashboard → Functions → See `api/generate.js`
- **Check:** Function logs in Vercel for specific errors

**Problem:** Out of API credits
- **Solution:** Add more credits at console.anthropic.com
- **Check:** Usage dashboard to monitor consumption

---

## 📈 Future Enhancements (Ideas)

- [ ] Difficulty level selector (6th grade vs 8th grade)
- [ ] Custom vocabulary word lists
- [ ] Save/load test templates
- [ ] Student results tracking
- [ ] Multiple test versions in one generation
- [ ] Export to PDF
- [ ] Spanish language support
- [ ] Integration with Google Classroom

---

## 🤝 Support

### Getting Help
1. Check the troubleshooting guides in `03-DEPLOY.md`
2. Review Vercel docs: https://vercel.com/docs
3. Review Anthropic docs: https://docs.anthropic.com

### Common Questions

**Q: Can I use this for my entire school?**
A: Yes! But you'll need to monitor API usage. Consider having teachers use their own API keys, or set up usage tracking.

**Q: Can students access this directly?**
A: Yes, just share your Vercel URL. However, consider rate limiting if many students will use it simultaneously.

**Q: How do I add more passages to Quick Mode?**
A: Edit the `storyPassages` and `poems` arrays in `index.html`. Add your own content following the same structure.

**Q: Can I customize the test format?**
A: Absolutely! The HTML is well-commented. Edit `index.html` to change question types, add sections, or modify styling.

---

## 📜 License

This project is provided as-is for educational purposes. Feel free to modify and adapt for your classroom needs.

---

## 🎓 About This Project

Created to help middle school ELA teachers:
- Save time on test creation
- Provide varied assessment options
- Leverage AI for unlimited content generation
- Maintain high-quality, grade-appropriate materials

Built with:
- Vanilla JavaScript (no frameworks needed)
- Claude Sonnet 4 API (state-of-the-art AI)
- Vercel Serverless Functions (free hosting)
- Modern, responsive design

---

## ✅ Setup Checklist

Use this to track your progress:

- [ ] Read `01-GET-API-KEY.md`
- [ ] Created Anthropic account
- [ ] Added API credits ($5 minimum)
- [ ] Saved API key securely
- [ ] Read `02-SETUP-PROJECT.md`
- [ ] Uploaded files to GitHub OR local folder
- [ ] Read `03-DEPLOY.md`
- [ ] Created Vercel account
- [ ] Connected GitHub to Vercel
- [ ] Added `ANTHROPIC_API_KEY` environment variable
- [ ] Deployed successfully
- [ ] Tested Quick Mode (works)
- [ ] Tested AI Mode (works)
- [ ] Bookmarked live URL
- [ ] Generated first test for students!

---

## 🎉 You're All Set!

Your unlimited ELA test generator is ready to use. Enjoy creating high-quality assessments for your students!

**Questions or feedback?** Feel free to modify and improve this tool for your specific needs.

Happy testing! 📝✨
