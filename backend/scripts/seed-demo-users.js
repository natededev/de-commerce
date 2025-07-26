/**
 * Demo User Seeding Script
 * 
 * Creates demo users in Supabase using the Admin API to bypass email confirmation.
 * This allows reviewers to immediately test the application without email verification.
 */

/* eslint-env node */
/* global process, console */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration in .env file')
  console.error('Required: SUPABASE_URL, SUPABASE_SERVICE_KEY')
  process.exit(1)
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const demoUsers = [
  {
    email: 'admin@gmail.com',
    password: 'demo123456',
    user_metadata: {
      name: 'Demo Admin',
      role: 'ADMIN'
    },
    email_confirm: true // Skip email confirmation
  },
  {
    email: 'user@gmail.com', 
    password: 'demo123456',
    user_metadata: {
      name: 'Demo User',
      role: 'USER'
    },
    email_confirm: true // Skip email confirmation
  }
]

async function seedDemoUsers() {
  console.log('🌱 Creating demo users for reviewer testing...\n')

  for (const userData of demoUsers) {
    try {
      console.log(`Creating user: ${userData.email}`)
      
      // Create user using admin API (bypasses email confirmation)
      const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: userData.user_metadata,
        email_confirm: userData.email_confirm
      })

      if (error) {
        if (error.message.includes('User already registered')) {
          console.log(`⚠️  User ${userData.email} already exists - skipping`)
        } else {
          console.error(`❌ Failed to create ${userData.email}:`, error.message)
        }
      } else {
        console.log(`✅ Successfully created: ${userData.email}`)
        console.log(`   - Name: ${userData.user_metadata.name}`)
        console.log(`   - Role: ${userData.user_metadata.role}`)
        console.log(`   - ID: ${data.user.id}`)
      }
      
    } catch (err) {
      console.error(`❌ Error creating ${userData.email}:`, err.message)
    }
    
    console.log('') // Empty line for readability
  }

  console.log('🎉 Demo user seeding completed!')
  console.log('\n📋 Demo Credentials for Reviewers:')
  console.log('   Admin User: admin@gmail.com / demo123456')
  console.log('   Regular User: user@gmail.com / demo123456')
  console.log('\n🔗 Login at: http://localhost:8080/login')
}

// Run the seeding
seedDemoUsers()
  .then(() => {
    console.log('\n✅ Seeding completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error.message)
    process.exit(1)
  })
