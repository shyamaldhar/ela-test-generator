# 🚀 Netlify Deployment Guide - ELA Test Generator

## ✅ Free Tier Confirmed!

Netlify Functions are **100% FREE** for your use case:
- **125,000 function requests/month** - FREE
- **100 hours runtime/month** - FREE
- More than enough for classroom use!

---

## 📋 Complete Deployment Steps

### **Step 1: Get Your API Key (5 minutes)**

1. Go to: https://console.anthropic.com/
2. Sign up / Log in
3. Go to "Settings" → "Billing"
4. Add $5 credits (gets you ~60-100 tests)
5. Go to "API Keys"
6. Click "Create Key"
7. **COPY THE KEY** (starts with `sk-ant-api03-...`)
8. Save it securely

---

### **Step 2: Deploy to Netlify (5 minutes)**

#### **Option A: Drag & Drop (Easiest!)**

1. **Extract the zip file** you downloaded
2. **Go to:** https://app.netlify.com/
3. **Sign in with GitHub**
4. **On dashboard**, look for drag & drop area
5. **Drag the ENTIRE extracted folder** to the upload area
6. **Wait 2-3 minutes** for deployment
7. **You'll get a URL** like: `random-name-123.netlify.app`

#### **Option B: Connect GitHub**

1. **Upload files to GitHub** (create new repo called `ela-test-generator`)
2. **Go to Netlify** → "Add new site" → "Import from Git"
3. **Connect GitHub** and select your repo
4. **Deploy settings:**
   - Build command: (leave empty)
   - Publish directory: `.` (just a dot)
   - Functions directory: `netlify/functions`
5. **Click "Deploy"**

---

### **Step 3: Add Your API Key (2 minutes)**

**CRITICAL STEP - Functions won't work without this!**

1. **Click on your new site** in Netlify
2. **Go to:** Site configuration → Environment variables
3. **Click "Add a variable"**
4. **Enter:**
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key (the `sk-ant-api03-...` you copied)
   - **Scopes:** Check all three boxes (Production, Deploy previews, Branch deploys)
5. **Click "Create variable"**

---

### **Step 4: Verify Functions Deployed (1 minute)**

1. **In your Netlify site**, click **"Functions"** in left sidebar
2. **You MUST see TWO functions:**
   - ✅ `analyze`
   - ✅ `generate`
3. **If you DON'T see them:**
   - Go to "Deploys"
   - Click latest deploy
   - Check the build log for errors
   - Make sure `netlify/functions/` folder exists in your upload

---

### **Step 5: Test Your Site! (2 minutes)**

1. **Visit your Netlify URL**
2. **Click "Generate New Test"** (Quick Mode)
   - Should work immediately!
3. **Click "🤖 AI Mode" tab**
4. **Click "Generate New Test"**
   - Wait 30-60 seconds
   - Should generate unique content!
5. **Check "Interactive Mode"** checkbox
   - Input fields should appear
6. **Answer a few questions**
7. **Click "Submit for AI Analysis"**
   - Wait 20-40 seconds
   - Should show detailed feedback!

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Site loads at your Netlify URL
- [ ] Quick Mode generates tests
- [ ] Functions show in Functions tab (analyze, generate)
- [ ] AI Mode generates unique content
- [ ] Interactive Mode shows input fields
- [ ] Submit for Analysis works and shows feedback
- [ ] No errors in browser console (F12)

---

## 🆘 Troubleshooting

### **"Error Generating AI Test"**

**Problem:** Functions not deployed or API key missing

**Solution:**
1. Check Functions tab - do you see `analyze` and `generate`?
2. If NO → Folder structure wrong, redeploy
3. If YES → Check environment variable `ANTHROPIC_API_KEY` exists
4. If variable exists → Check Anthropic credits balance

---

### **"Unexpected end of JSON input"**

**Problem:** Functions deployed but not responding correctly

**Solution:**
1. Go to Functions tab
2. Click on `generate` function
3. Check the logs for errors
4. Most common: API key not set or invalid
5. Go to Environment variables and verify key is correct

---

### **Functions Tab is Empty**

**Problem:** `netlify/functions/` folder not deployed

**Solution:**
1. Check your extracted zip has:
   - `netlify/functions/generate.js`
   - `netlify/functions/analyze.js`
2. Redeploy with correct folder structure
3. Make sure you dragged the FOLDER, not just files

---

### **AI Mode Shows Loading Forever**

**Problem:** Function timeout or API error

**Solution:**
1. Check browser console (F12) for errors
2. Go to Netlify Functions tab
3. Click on `generate` → View logs
4. Check for:
   - API key errors
   - Anthropic API errors
   - Timeout errors
5. Verify Anthropic credits aren't depleted

---

## 💰 Cost Management

### **Monitor Usage:**
1. **Netlify Functions:** Free tier is plenty
   - Dashboard shows function invocations
   - 125K requests/month FREE

2. **Anthropic API:**
   - https://console.anthropic.com/settings/billing
   - Check "Usage" tab
   - Each test generation: ~$0.04-0.05
   - Each analysis: ~$0.03-0.04

### **Typical Costs:**
- **Quick Mode:** FREE (no AI calls)
- **AI Mode test:** $0.04-0.05
- **Interactive + Analysis:** $0.07-0.09 per student
- **Class of 25:** ~$2.00 total

---

## 🎯 Your Netlify URLs

After deployment, you'll have:
- **Site URL:** `https://your-site-name.netlify.app`
- **Functions:**
  - `https://your-site-name.netlify.app/.netlify/functions/generate`
  - `https://your-site-name.netlify.app/.netlify/functions/analyze`

---

## 🎓 Using With Students

### **For Homework:**
1. Share your Netlify URL with students
2. They check "Interactive Mode"
3. They complete test online
4. They submit for instant AI feedback
5. **Cost:** ~$0.08 per student

### **For Formal Testing:**
1. Uncheck "Interactive Mode"
2. Generate and print test
3. Students fill on paper
4. Teacher grades manually
5. **Cost:** ~$0.04 per test (if using AI Mode)

### **For Practice:**
1. Use Quick Mode (FREE!)
2. Generates from pre-written content
3. Students can take unlimited tests
4. **Cost:** $0.00

---

## 🎉 You're Done!

You now have:
- ✅ Free Netlify hosting
- ✅ Free Netlify Functions (125K/month)
- ✅ AI-powered test generation
- ✅ Interactive mode with feedback
- ✅ Unlimited Quick Mode tests
- ✅ Professional classroom tool

**Share your URL with students and start using it!**

---

## 📞 Need Help?

- **Netlify Docs:** https://docs.netlify.com/functions/overview/
- **Anthropic Docs:** https://docs.anthropic.com/
- **Check browser console (F12)** for errors
- **Check Netlify function logs** for backend errors

---

**Happy teaching!** 🎓✨
