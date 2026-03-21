import { createClient } from './supabase/server'

export async function getSiteContent() {
  const contentMap: Record<string, string> = {}
  
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('site_content')
      .select('section_key, content_value')
    
    if (error) {
      console.error('Error fetching site content:', error)
      return contentMap
    }

    if (data) {
      data.forEach((item: any) => {
        contentMap[item.section_key] = item.content_value
      })
    }
  } catch (err) {
    console.error('getSiteContent unexpected error:', err)
  }
  
  return contentMap
}
