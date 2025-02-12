"use server";
import { createClient } from "@/utils/supabase/server";
import { stat } from "fs";


interface commitData {
    message: string,
    projectId: string,
    authorName : string,
}

export async function addCommit(commitData : commitData){
    // The commit data includes , commit message , projectId, authorName
    const supabase = await createClient()

    const { data: commit, error: CommitError } = await supabase.from("commits").insert({
        message: commitData.message,
        projectId : commitData.projectId,
        authorName : commitData.authorName
    })
    if (CommitError) {
        return {status :CommitError, data : null}
    }
    return {status : "Success" , data:commit}
}

export async function getCommits(projectId: string) {
    const supabase = await createClient()

    const { data: commits, error: commitsFetchError } = await supabase.from("commits").select("*").eq("projectId", projectId).order("created_at",{ascending:false})
    if (commitsFetchError) {
        return { status: commitsFetchError, data: null }
    }
    return {status : "Success" , data : commits}
}

export async function getLatestCommit(projectId: string) {
    const supabase = await createClient()

    const { data: latestCommit, error } = await supabase
      .from("commits")
      .select("*")
      .eq("projectId", projectId)
        .order("created_at", { ascending: false })
        .limit(1)
    if (error) {
        return {status : error , data : null}
    }
    return {status : "Success" ,data:latestCommit}
}
