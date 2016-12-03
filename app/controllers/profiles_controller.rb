class ProfilesController < ApplicationController
  def new
    @profile = Profile.new
  end
  
  def create
    @user = User.find(params[:user_id])
    @profile = @user.build_profile(profile_params)
    if @profile.save
      flash[:success] = "Profile updated!"
      redirect_to user_path(id: params[:user_id])
    else
      render action: :new
    end
  end
  
  def edit
    @profile = User.find(params[:user_id]).profile
  end
  
  def update
    @profile = User.find(params[:user_id]).profile
    if @profile.update_attributes(profile_params)
      flash[:success] = "Profile has been updated"
      redirect_to user_path(id: params[:user_id])
    else
      render action: :edit
    end
  end
    
  private
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :job_title, :phone_number, :email, :description, :avatar)
    end
end