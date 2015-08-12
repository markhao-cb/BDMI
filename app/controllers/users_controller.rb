class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    if params[:password] != params[:comfirm_password]
      flash.now[:errors] = ["Password doesn't match."]
      render :new
    else
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        redirect_to root_url
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password, :comfirm_password)
  end
end
