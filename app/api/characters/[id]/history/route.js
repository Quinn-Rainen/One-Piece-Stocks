import { supabase } from '../../../../../lib/supabase'

export async function GET(request, { params }) {
  const { id } = await params

  const { data, error } = await supabase
    .from('stock_prices')
    .select('*')
    .eq('character_id', id)
    .order('recorded_at', { ascending: true })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}