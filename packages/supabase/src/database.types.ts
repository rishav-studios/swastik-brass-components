export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      sectors: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          home_description: string
          dedicated_description: string
          display_order: number
          image_url: any
          cover_image_url: any
          seo_metadata: any
        }
        Insert: any
        Update: any
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
