/**
 * RLS Security Verification Test
 *
 * This script tests that the RLS security fixes have been applied correctly.
 * Run this as a Node.js script to verify:
 * 1. Public read access is blocked on all user data tables
 * 2. Public insert access still works (forms can submit data)
 *
 * Usage:
 * NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... node supabase/test_rls_security.js
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Error: Missing environment variables.');
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.error('Example: NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... node supabase/test_rls_security.js');
    process.exit(1);
}

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
        process.exit(1);
    }
}

// Run the tests
runTests().catch(err => {
    console.error(err);
    process.exit(1);
});
