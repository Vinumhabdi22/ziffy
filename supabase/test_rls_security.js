/**
 * RLS Security Verification Test
 * 
 * This script tests that the RLS security fixes have been applied correctly.
 * Run this in your browser console or as a Node.js script to verify:
 * 1. Public read access is blocked on all user data tables
 * 2. Public insert access still works (forms can submit data)
 */

// Import Supabase client (adjust the import based on your environment)
import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR ACTUAL VALUES
const SUPABASE_URL = 'https://bmqmxhmwahdayqrnsdz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcW14aG13YWhkYXlycXJuc2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTA1NTAsImV4cCI6MjA4NDAyNjU1MH0.Y1BsLUeZ2k6NYAMUKPo7U_EJTWHiI1cXHGbqt0QyLdo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// List of tables that should block public read access
const protectedTables = [
    'listing_inquiry',
    'newsletter_subscriptions',
    'partnership_leads',
    'sfr_leads',
    'contact_inquiries'
];

console.log('🔒 Testing RLS Security Fixes\n');
console.log('='.repeat(50));

async function testPublicReadBlocked() {
    console.log('\n📋 Test 1: Verify Public Read Access is Blocked\n');

    let allBlocked = true;

    for (const table of protectedTables) {
        try {
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .limit(1);

            if (error) {
                // Check if it's a permission error
                if (error.code === 'PGRST301' || error.message.includes('permission') || error.message.includes('policy')) {
                    console.log(`✅ ${table.padEnd(25)} - Public read BLOCKED (secure)`);
                } else {
                    console.log(`⚠️  ${table.padEnd(25)} - Error: ${error.message}`);
                    allBlocked = false;
                }
            } else if (data) {
                console.log(`❌ ${table.padEnd(25)} - PUBLIC READ STILL ALLOWED! SECURITY ISSUE!`);
                allBlocked = false;
            }
        } catch (err) {
            console.log(`❌ ${table.padEnd(25)} - Unexpected error:`, err);
            allBlocked = false;
        }
    }

    return allBlocked;
}

async function testPublicInsertWorks() {
    console.log('\n📋 Test 2: Verify Public Insert Still Works\n');

    // Test newsletter subscription insert
    try {
        const { error } = await supabase
            .from('newsletter_subscriptions')
            .insert({
                email: `test-${Date.now()}@example.com`,
                interests: ['Market Reports']
            });

        if (error && error.code !== '23505') { // 23505 is unique violation, which is ok
            console.log(`❌ newsletter_subscriptions - Insert FAILED: ${error.message}`);
            return false;
        } else {
            console.log(`✅ newsletter_subscriptions - Insert works (forms functional)`);
        }
    } catch (err) {
        console.log(`❌ newsletter_subscriptions - Insert error:`, err);
        return false;
    }

    return true;
}

async function runTests() {
    console.log('\n🚀 Starting RLS Security Tests...\n');

    const readBlocked = await testPublicReadBlocked();
    const insertWorks = await testPublicInsertWorks();

    console.log('\n' + '='.repeat(50));
    console.log('\n📊 TEST RESULTS:\n');

    if (readBlocked && insertWorks) {
        console.log('✅ ALL TESTS PASSED!');
        console.log('   - Public read access is blocked');
        console.log('   - Forms can still submit data');
        console.log('\n🎉 RLS Security fix successfully applied!\n');
    } else {
        console.log('❌ SOME TESTS FAILED!');
        if (!readBlocked) {
            console.log('   - Public read access is NOT fully blocked');
        }
        if (!insertWorks) {
            console.log('   - Forms cannot submit data');
        }
        console.log('\n⚠️  Review the errors above and check your RLS policies.\n');
    }
}

// Run the tests
runTests().catch(console.error);
