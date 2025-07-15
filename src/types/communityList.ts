interface CommunityData {	
	id : number
	author:{
		id:number
		nickname: string
		profile_image_url : string | null
	}
	summary: string
	thumbnail :{
		id: number
		image_url : string
		image_name : string
	}
	category :{
		id : number
		name : string
		status : boolean
		created_at: string
		updated_at: string
	}
	title : string
	created_at : string
	likes_count : number
	comment_count : number
	view_count : number
}