import { createClient } from './supabase/server'

export async function getSiteContent() {
  const supabase = createClient()
  const { data } = await supabase.from('site_content').select('section_key, content_value')
  
  const contentMap: Record<string, string> = {}
  if (data) {
    data.forEach((item) => {
      contentMap[item.section_key] = item.content_value
    })
  }
  return contentMap
}
