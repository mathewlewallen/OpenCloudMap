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
      activity_log: {
        Row: {
          action: Database["public"]["Enums"]["activity_type"]
          id: number
          ip_address: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["activity_type"]
          id?: number
          ip_address?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["activity_type"]
          id?: number
          ip_address?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      article_reactions: {
        Row: {
          article_slug: string
          count: number
          created_at: string
          reaction_type: Database["public"]["Enums"]["reaction_type_enum"]
          updated_at: string
        }
        Insert: {
          article_slug: string
          count?: number
          created_at?: string
          reaction_type: Database["public"]["Enums"]["reaction_type_enum"]
          updated_at?: string
        }
        Update: {
          article_slug?: string
          count?: number
          created_at?: string
          reaction_type?: Database["public"]["Enums"]["reaction_type_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_article_views"
            columns: ["article_slug"]
            isOneToOne: false
            referencedRelation: "article_views"
            referencedColumns: ["slug"]
          },
        ]
      }
      article_views: {
        Row: {
          last_viewed_at: string
          slug: string
          view_count: number
        }
        Insert: {
          last_viewed_at?: string
          slug: string
          view_count?: number
        }
        Update: {
          last_viewed_at?: string
          slug?: string
          view_count?: number
        }
        Relationships: []
      }
      chat: {
        Row: {
          created_at: string
          id: number
          messages: string[] | null
          path: string | null
          profile_id: string
          sharepath: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at: string
          id?: never
          messages?: string[] | null
          path?: string | null
          profile_id: string
          sharepath?: string | null
          title?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: never
          messages?: string[] | null
          path?: string | null
          profile_id?: string
          sharepath?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      continents: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          continent_id: string
          full_name: string
          id: string
          iso3: string
          name: string
          number: string
        }
        Insert: {
          continent_id: string
          full_name: string
          id: string
          iso3: string
          name: string
          number: string
        }
        Update: {
          continent_id?: string
          full_name?: string
          id?: string
          iso3?: string
          name?: string
          number?: string
        }
        Relationships: [
          {
            foreignKeyName: "countries_continent_id_fkey"
            columns: ["continent_id"]
            isOneToOne: false
            referencedRelation: "continents"
            referencedColumns: ["id"]
          },
        ]
      }
      inqueries: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: never
          message: string
          name?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: never
          message?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          id: number
          meet_link: string
          start_time: string
          summary: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          id?: never
          meet_link: string
          start_time: string
          summary: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          id?: never
          meet_link?: string
          start_time?: string
          summary?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      members_table: {
        Row: {
          created_at: string
          email: string | null
          id: number
          member_id: string
          name: string | null
          password: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: never
          member_id: string
          name?: string | null
          password?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: never
          member_id?: string
          name?: string | null
          password?: string
        }
        Relationships: []
      }
      permission_table: {
        Row: {
          created_at: string
          id: number
          member_id: string
          role: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: number
          member_id: string
          role: string
          status: string
        }
        Update: {
          created_at?: string
          id?: number
          member_id?: string
          role?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          card_style: Json | null
          card_styles: string | null
          company: string | null
          company_logo_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          job_title: string | null
          linkedin_url: string | null
          public_id: string | null
          role: string | null
          updated_at: string | null
          username: string | null
          waddress: string | null
          website: string | null
          xhandle: string | null
        }
        Insert: {
          avatar_url?: string | null
          card_style?: Json | null
          card_styles?: string | null
          company?: string | null
          company_logo_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          public_id?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          waddress?: string | null
          website?: string | null
          xhandle?: string | null
        }
        Update: {
          avatar_url?: string | null
          card_style?: Json | null
          card_styles?: string | null
          company?: string | null
          company_logo_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          public_id?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          waddress?: string | null
          website?: string | null
          xhandle?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          created_by: string
          id: number
          is_complete: boolean | null
          task: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: number
          is_complete?: boolean | null
          task?: string | null
          title?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: number
          is_complete?: boolean | null
          task?: string | null
          title?: string
          user_id?: string
        }
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
      activity_type:
        | "SIGN_UP"
        | "SIGN_IN"
        | "SIGN_OUT"
        | "UPDATE_PASSWORD"
        | "DELETE_ACCOUNT"
        | "UPDATE_ACCOUNT"
        | "CREATE_TEAM"
        | "REMOVE_TEAM_MEMBER"
        | "INVITE_TEAM_MEMBER"
        | "ACCEPT_INVITATION"
      reaction_type_enum: "like" | "heart" | "celebrate" | "insightful"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: [
        "SIGN_UP",
        "SIGN_IN",
        "SIGN_OUT",
        "UPDATE_PASSWORD",
        "DELETE_ACCOUNT",
        "UPDATE_ACCOUNT",
        "CREATE_TEAM",
        "REMOVE_TEAM_MEMBER",
        "INVITE_TEAM_MEMBER",
        "ACCEPT_INVITATION",
      ],
      reaction_type_enum: ["like", "heart", "celebrate", "insightful"],
    },
  },
} as const

