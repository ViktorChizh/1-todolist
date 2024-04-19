import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatchType, AppStateType } from "app/Store"
import { netWorkErrorHandler } from "common/utils/netWorkErrorHandler"
import { actions } from "common/actions"
import { BaseResponseType } from "common/api"

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppStateType, unknown, AppDispatchType, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(actions.setAppStatusAC({ status: "loading" }))
  try {
    return await logic()
  } catch (e) {
    netWorkErrorHandler(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(actions.setAppStatusAC({ status: "idle" }))
  }
}