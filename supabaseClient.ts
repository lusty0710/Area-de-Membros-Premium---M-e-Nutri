import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zcpttgrjtoccfbbijlqf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4Zf6lYSKcK41rGkHkzMXeA_V3sbeey4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);